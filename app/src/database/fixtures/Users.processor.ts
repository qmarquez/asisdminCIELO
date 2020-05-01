import { IProcessor } from 'typeorm-fixtures-cli';
import { hash } from 'bcryptjs'

import { User } from '../../modules/user/user.entity';
import { Role } from '../../modules/user/role.entity';
import { getConnection, Connection } from 'typeorm';

export default class UserProcessor implements IProcessor<User> {
  async preProcess(name: string, object: any): Promise<any> {
    const { password, role } = object;
    // TODO: Usar el mismo método que cifre passwords mas adelante
    const hashed = await hash(password, 10);

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