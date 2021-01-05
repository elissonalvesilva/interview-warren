import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateHistoryAndAccount1609807563154 implements MigrationInterface {
  name = 'UpdateHistoryAndAccount1609807563154'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "lastBalance" double precision NOT NULL DEFAULT \'0\', "actualBalance" double precision NOT NULL DEFAULT \'0\', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" uuid, CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "balance"')
    await queryRunner.query('ALTER TABLE "account" ADD "balance" double precision NOT NULL DEFAULT \'0\'')
    await queryRunner.query('ALTER TABLE "history" ADD CONSTRAINT "FK_2c939f48b096561fc6de387c4b5" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "history" DROP CONSTRAINT "FK_2c939f48b096561fc6de387c4b5"')
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "balance"')
    await queryRunner.query('ALTER TABLE "account" ADD "balance" integer NOT NULL')
    await queryRunner.query('DROP TABLE "history"')
  }
}
