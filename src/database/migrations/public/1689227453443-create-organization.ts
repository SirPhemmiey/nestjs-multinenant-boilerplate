import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateOrganization1689227453443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "organizations",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "schema_name",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: 'date',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: "updated_at",
                        type: 'date',
                        default: 'CURRENT_TIMESTAMP',
                    },

                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('organizations', true);
    }

}
