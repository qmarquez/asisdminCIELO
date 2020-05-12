export interface IRjwtPayload {
  id: number;
  token: string;
  iat?: Date;
  exp?: Date;
  iss?: string;
}