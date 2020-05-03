import { User } from '../user.entity';
import { Role } from '../role.entity';

describe('User entity', () => {
  it('should make a user with no fields', () => {
    const user = new User();
    expect(user.username).toBe(undefined);
    expect(user.password).toBe(undefined);
    expect(user.name).toBe(undefined);
    expect(user.role).toBe(undefined);
    expect(user.createdAt).toBe(undefined);
    expect(user.updatedAt).toBe(undefined);
  });

  it('should make a user with no role', () => {
    const user = new User('someunanme', '123456', 'a name');
    expect(user.username).toBe('someunanme');
    expect(user.password).toBe('123456');
    expect(user.name).toBe('a name');
    expect(user.role).toBe(undefined);
  });

  it('should make a user with role', () => {
    const role = new Role()
    const user = new User('someunanme', '123456', 'a name', role);
    expect(user.username).toBe('someunanme');
    expect(user.password).toBe('123456');
    expect(user.name).toBe('a name');
    expect(user.role).toBe(role);
  });
});