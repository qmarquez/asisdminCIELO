export interface IJwtPayload {
  id: number;
  username: string;
  name: string;
  iat?: Date;
}