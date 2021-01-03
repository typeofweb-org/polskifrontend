CREATE OR REPLACE FUNCTION notify_of_changes() RETURNS trigger AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    PERFORM (
      pg_notify(TG_OP || '.' || TG_TABLE_NAME, to_json(NEW.id)::text)
    );
  ELSIF (TG_OP = 'UPDATE') THEN
    PERFORM (
      pg_notify(TG_OP || '.' || TG_TABLE_NAME, to_json(NEW.id)::text)
    );
  ELSIF (TG_OP = 'DELETE') THEN
    PERFORM (
      pg_notify(TG_OP || '.' || TG_TABLE_NAME, to_json(OLD.id)::text)
    );
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_articles
AFTER INSERT OR UPDATE OR DELETE ON "Article"
FOR EACH ROW EXECUTE PROCEDURE notify_of_changes();
