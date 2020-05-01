import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleSeeds1588202906614 implements MigrationInterface {
    name = 'RoleSeeds1588202906614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO `roles` (`roles`.`name`, `roles`.`description`) VALUES ('Duenno', 'Usuario con permisos de administrador'), ('Staff', 'Usuario staff'), ('Administrativo', 'Usuario administrativo');", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> { 
        await queryRunner.query("TRUNCATE TABLE `roles`", undefined);
    }

}
