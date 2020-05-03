import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { status } from '../../shared/status.enum';

@Entity('roles')
export class Role extends BaseEntity {

  constructor(name?: string, description?: string, users?: Array<User>);
  constructor(name: string, description?: string, users?: Array<User>) {
    super()
    this.name = name;
    this.description = description;
    this.users = users;
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => User, ({ role }) => role)
  @JoinColumn()
  users: Array<User>;

  @Column({ type: 'varchar', default: status.ACTIVE, length: '8' })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}