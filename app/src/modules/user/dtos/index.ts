import { Expose, Type, Exclude } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';

@Exclude()
export class ReadRoleDTO {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'Name not valid' })
  readonly name: string;


  @Expose()
  @IsString()
  @MaxLength(100, { message: 'Description not valid' })
  readonly description: string;
}

@Exclude()
export class ReadUserDTO {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly username: string;

  @Expose()
  @Type(() => ReadRoleDTO)
  readonly role: ReadRoleDTO;
}

@Exclude()
export class LoggedInDTO {
  @Expose()
  @IsString()
  token: string;

  @Expose()
  @IsString()
  refresh: string;

  @Expose()
  @Type(() => ReadUserDTO)
  user: ReadUserDTO;
}