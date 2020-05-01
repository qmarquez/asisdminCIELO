import {MigrationInterface, QueryRunner} from "typeorm";

export class OneRoleByUser1588299889648 implements MigrationInterface {
    name = 'OneRoleByUser1588299889648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` ADD `roleId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `roleId`", undefined);
    }

}
