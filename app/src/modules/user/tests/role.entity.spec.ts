import { Role } from '../role.entity';
import { User } from '../user.entity';

describe('Role entity', () => {
  it('should make a user with no fields', () => {
    const role = new Role();
    expect(role.id).toBe(undefined);
    expect(role.name).toBe(undefined);
    expect(role.description).toBe(undefined);
    expect(role.users).toBe(undefined);
    expect(role.status).toBe(undefined);
    expect(role.createdAt).toBe(undefined);
    expect(role.updatedAt).toBe(undefined);
  });

  it('should make a role with name', () => {
    const role = new Role('Rooole');
    expect(role.name).toBe('Rooole');
    expect(role.description).toBe(undefined);
    expect(role.users).toBe(undefined);
  });

  it('should make a role with name and description', () => {
    const role = new Role('Rooole', 'nice description');
    expect(role.name).toBe('Rooole');
    expect(role.description).toBe('nice description');
    expect(role.users).toBe(undefined);
  });

  it('should make a role with name and description and users', () => {
    const users = [new User(), new User()];
    const role = new Role('Rooole', 'nice description', users);
    expect(role.name).toBe('Rooole');
    expect(role.description).toBe('nice description');
    expect(role.users).toBe(users);
  });

});