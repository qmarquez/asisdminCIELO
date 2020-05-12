export interface IJwtPayload {
  id: number;
  roleId: number;
  username: string;
  name: string;
  iat?: Date;
  exp?: Date;
  iss?: string;
}