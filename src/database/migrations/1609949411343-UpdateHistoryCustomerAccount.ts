import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateHistoryCustomerAccount1609949411343 implements MigrationInterface {
  name = 'UpdateHistoryCustomerAccount1609949411343'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "permanentAddress" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "movimentationType" integer NOT NULL DEFAULT \'1\', "lastBalance" double precision NOT NULL DEFAULT \'0\', "actualBalance" double precision NOT NULL DEFAULT \'0\', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" uuid, CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountNumber" integer NOT NULL, "type" integer NOT NULL, "balance" double precision NOT NULL DEFAULT \'0\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" uuid, CONSTRAINT "UQ_ee66d482ebdf84a768a7da36b08" UNIQUE ("accountNumber"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "history" ADD CONSTRAINT "FK_2c939f48b096561fc6de387c4b5" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "account" ADD CONSTRAINT "FK_295cfbf4cba51e0e67a6984ab8f" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "account" DROP CONSTRAINT "FK_295cfbf4cba51e0e67a6984ab8f"')
    await queryRunner.query('ALTER TABLE "history" DROP CONSTRAINT "FK_2c939f48b096561fc6de387c4b5"')
    await queryRunner.query('DROP TABLE "account"')
    await queryRunner.query('DROP TABLE "history"')
    await queryRunner.query('DROP TABLE "customer"')
  }
}
