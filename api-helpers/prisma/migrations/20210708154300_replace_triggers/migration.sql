DROP TRIGGER IF EXISTS notify_articles ON "Article";
DROP FUNCTION IF EXISTS notify_of_changes;

DROP TABLE IF EXISTS "Secret";

CREATE TABLE "Secret" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

CREATE OR REPLACE FUNCTION notify_of_changes() RETURNS trigger AS $$
DECLARE article_id TEXT;
DECLARE payload TEXT;
DECLARE signat TEXT;
BEGIN
  SET search_path = public, extensions;

  IF (TG_OP = 'INSERT') THEN
    article_id := NEW.id::TEXT;
  ELSIF (TG_OP = 'UPDATE') THEN
    article_id := NEW.id::TEXT;
  ELSIF (TG_OP = 'DELETE') THEN
    article_id := OLD.id::TEXT;
  END IF;

  SELECT jsonb_build_object('id', article_id, 'event', TG_OP::TEXT)::TEXT INTO payload;
  SELECT encode(
    hmac(
      payload,
      (SELECT id from public."Secret" WHERE "name" = 'notification_signature' LIMIT 1),
      'sha512'
    ),
    'hex'
  ) INTO signat;
  
  PERFORM http(
    (
      'POST',
      'https://polskifrontend.pl/api/update-algolia',
      ARRAY[http_header('X-Signature', signat)],
      'application/json',
      payload
    )::http_request
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_articles
AFTER INSERT OR UPDATE OR DELETE ON "Article"
FOR EACH ROW EXECUTE PROCEDURE notify_of_changes();
