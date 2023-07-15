import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688595236841 implements MigrationInterface {
    name = 'Default1688595236841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "specifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_621aabf71e640ab86f0e8b62a37" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "specifications"`);
    }

}
