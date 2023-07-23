import { MigrationInterface, QueryRunner, Table, ColumnType } from "typeorm"

export class CreateUser1688851018523 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "firstName",
                        type: "varchar",
                    },
                    {
                        name: "lastName",
                        type: "varchar",
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },

                    {
                        name: "isActive",
                        type: "boolean",
                    },
                    {
                        name: "isDeleted",
                        type: "boolean",
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
                        // default: new Date(),
                    },
                    // {
                    //     name: "created_at",
                    //     type: "date",
                    // },
                    // {
                    //     name: "updated_at",
                    //     type: "date",
                    // },

                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users", true);
    }

}
