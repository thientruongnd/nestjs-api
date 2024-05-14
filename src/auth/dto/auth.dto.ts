/**
 * Created by Truong on 10/08/23.
 * truongdx@runsystem.net - Xuan Truong
 * Define a "type" of "authemtication request"
 * */
import { IsEmail, IsNotEmpty } from 'class-validator';
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  firstName: string;
  lastName: string;
}
