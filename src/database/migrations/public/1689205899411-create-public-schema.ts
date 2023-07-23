import { MigrationInterface, QueryRunner } from "typeorm"

export class CreatePublicSchema1689205899411 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createSchema('public', true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropSchema('public', true);
    }

}