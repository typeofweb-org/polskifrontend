-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "lastArticlePublishedAt" TIMESTAMP(3);

UPDATE "Blog" SET "lastArticlePublishedAt" = (SELECT "publishedAt" FROM "Article" WHERE "blogId" = "Blog"."id" ORDER BY "publishedAt" DESC LIMIT 1);


CREATE OR REPLACE FUNCTION update_last_article_published_at() RETURNS trigger AS $last_article_published_at$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE "Blog" SET "lastArticlePublishedAt" = NEW."publishedAt" WHERE id = NEW."blogId" AND "Blog"."lastArticlePublishedAt" < NEW."publishedAt";
    RETURN NULL;
  END IF;
  RETURN NULL;
END;
$last_article_published_at$ LANGUAGE plpgsql;

CREATE TRIGGER last_article_published_at
AFTER INSERT ON "Article"
FOR EACH ROW EXECUTE PROCEDURE update_last_article_published_at();
