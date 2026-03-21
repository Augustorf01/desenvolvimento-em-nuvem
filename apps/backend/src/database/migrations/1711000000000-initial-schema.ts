import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1711000000000 implements MigrationInterface {
  name = "InitialSchema1711000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.query(`
      CREATE TYPE "public"."items_type_enum" AS ENUM('book', 'movie')
    `);

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(120) NOT NULL,
        "email" character varying(160) NOT NULL,
        "password_hash" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "items" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "type" "public"."items_type_enum" NOT NULL,
        "title" character varying(180) NOT NULL,
        "description" text NOT NULL,
        "author_or_director" character varying(180) NOT NULL,
        "release_year" integer NOT NULL,
        "genre" character varying(100),
        "cover_url" text,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_items_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "reviews" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "rating" integer NOT NULL,
        "comment" text NOT NULL,
        "item_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "uq_reviews_user_item" UNIQUE ("user_id", "item_id"),
        CONSTRAINT "PK_reviews_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_reviews_item" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_reviews_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "CHK_reviews_rating" CHECK ("rating" >= 1 AND "rating" <= 5)
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_reviews_item_id" ON "reviews" ("item_id")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_reviews_user_id" ON "reviews" ("user_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS "public"."IDX_reviews_user_id"');
    await queryRunner.query('DROP INDEX IF EXISTS "public"."IDX_reviews_item_id"');
    await queryRunner.query('DROP TABLE IF EXISTS "reviews"');
    await queryRunner.query('DROP TABLE IF EXISTS "items"');
    await queryRunner.query('DROP TABLE IF EXISTS "users"');
    await queryRunner.query('DROP TYPE IF EXISTS "public"."items_type_enum"');
  }
}
