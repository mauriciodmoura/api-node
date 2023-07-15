import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688596802101 implements MigrationInterface {
    name = 'Default1688596802101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_a9606be942c7a7983466a0aa300"`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_06812f537c06afbf37a9938f352"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9606be942c7a7983466a0aa30"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06812f537c06afbf37a9938f35"`);
        await queryRunner.query(`CREATE TABLE "rentals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "car_id" uuid NOT NULL, "user_id" uuid NOT NULL, "start_date" TIMESTAMP NOT NULL DEFAULT 'now()', "end_date" TIMESTAMP, "expected_return_date" TIMESTAMP NOT NULL, "total" numeric, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ALTER COLUMN "car_id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ALTER COLUMN "specification_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" DROP CONSTRAINT "PK_63472a3f9ebc2f9ea4f3e89540e"`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ADD CONSTRAINT "PK_a9606be942c7a7983466a0aa300" PRIMARY KEY ("car_id")`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" DROP CONSTRAINT "PK_a9606be942c7a7983466a0aa300"`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ADD CONSTRAINT "PK_63472a3f9ebc2f9ea4f3e89540e" PRIMARY KEY ("car_id", "specification_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_a9606be942c7a7983466a0aa30" ON "specifications_cars" ("car_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_06812f537c06afbf37a9938f35" ON "specifications_cars" ("specification_id") `);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_243d136cb7fd3e65b4630fe6bf9" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_b13ac8580bd6a011f47a476fbad" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ADD CONSTRAINT "FK_a9606be942c7a7983466a0aa300" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ADD CONSTRAINT "FK_06812f537c06afbf37a9938f352" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_06812f537c06afbf37a9938f352"`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_a9606be942c7a7983466a0aa300"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_b13ac8580bd6a011f47a476fbad"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_243d136cb7fd3e65b4630fe6bf9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06812f537c06afbf37a9938f35"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9606be942c7a7983466a0aa30"`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" DROP CONSTRAINT "PK_63472a3f9ebc2f9ea4f3e89540e"`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ADD CONSTRAINT "PK_a9606be942c7a7983466a0aa300" PRIMARY KEY ("car_id")`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" DROP CONSTRAINT "PK_a9606be942c7a7983466a0aa300"`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ADD CONSTRAINT "PK_63472a3f9ebc2f9ea4f3e89540e" PRIMARY KEY ("car_id", "specification_id")`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ALTER COLUMN "specification_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ALTER COLUMN "car_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "rentals"`);
        await queryRunner.query(`CREATE INDEX "IDX_06812f537c06afbf37a9938f35" ON "specifications_cars" ("specification_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a9606be942c7a7983466a0aa30" ON "specifications_cars" ("car_id") `);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ADD CONSTRAINT "FK_06812f537c06afbf37a9938f352" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specifications_cars" ADD CONSTRAINT "FK_a9606be942c7a7983466a0aa300" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
