import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688595443241 implements MigrationInterface {
    name = 'Default1688595443241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "daily_rate" numeric NOT NULL, "available" boolean NOT NULL DEFAULT true, "license_plate" character varying NOT NULL, "fine_amount" numeric NOT NULL, "brand" character varying NOT NULL, "category_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specifications_cars" ("car_id" uuid NOT NULL, "specification_id" uuid NOT NULL, CONSTRAINT "PK_63472a3f9ebc2f9ea4f3e89540e" PRIMARY KEY ("car_id", "specification_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a9606be942c7a7983466a0aa30" ON "specifications_cars" ("car_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_06812f537c06afbf37a9938f35" ON "specifications_cars" ("specification_id") `);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_9b6410d2f4eabb985524faae074" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ADD CONSTRAINT "FK_a9606be942c7a7983466a0aa300" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ADD CONSTRAINT "FK_06812f537c06afbf37a9938f352" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_06812f537c06afbf37a9938f352"`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_a9606be942c7a7983466a0aa300"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_9b6410d2f4eabb985524faae074"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06812f537c06afbf37a9938f35"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9606be942c7a7983466a0aa30"`);
        await queryRunner.query(`DROP TABLE "specifications_cars"`);
        await queryRunner.query(`DROP TABLE "cars"`);
    }

}
