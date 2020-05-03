import { IProcessor } from 'typeorm-fixtures-cli';
import { hash } from 'bcryptjs'

import { User } from '../../modules/user/user.entity';
import { Role } from '../../modules/user/role.entity';
import { getConnection, Connection } from 'typeorm';
import { hashPassword } from '../../lib/hash-password';

export default class UserProcessor implements IProcessor<User> {
  async preProcess(name: string, object: any): Promise<any> {
    const { password, role } = object;
    const hashed = hashPassword(password);

    let connection: Connection;
    let roleId: number;
    try {
      connection = await getConnection();

      roleId = (await connection.query(`SELECT * FROM \`roles\` WHERE \`name\` = '${role}'`))[0].id;
    } catch (error) {
      console.log(error)
    }

    return { ...object, password: hashed, role: roleId };
  }
}