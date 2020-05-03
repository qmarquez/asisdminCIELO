import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { status } from "../../shared/status.enum";
import { Role } from "./role.entity";

@Entity('users')
export class User extends BaseEntity {

  constructor(username?: string, password?: string, name?: string, role?: Role)
  constructor(username: string, password: string, name: string, role?: Role) {
    super();
    this.username = username;
    this.password = password;
    this.name = name;
    this.role = role;
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  name: string;

  @ManyToOne(() => Role, ({ users }) => users, { eager: true })
  role: Role;

  @Column({ type: 'varchar', default: status.ACTIVE, length: '8' })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}