import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAndRoleDefinition1587950448785 implements MigrationInterface {
    name = 'UserAndRoleDefinition1587950448785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(25) NOT NULL, `password` varchar(255) NOT NULL, `name` varchar(25) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), UNIQUE INDEX `IDX_51b8b26ac168fbe7d6f5653e6c` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(20) NOT NULL, `description` text NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_648e3f5447f725579d7d4ffdfb` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_648e3f5447f725579d7d4ffdfb` ON `roles`", undefined);
        await queryRunner.query("DROP TABLE `roles`", undefined);
        await queryRunner.query("DROP INDEX `IDX_51b8b26ac168fbe7d6f5653e6c` ON `users`", undefined);
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`", undefined);
        await queryRunner.query("DROP TABLE `users`", undefined);
    }

}
