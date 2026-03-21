import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: "Jane Doe" })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: "jane@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 8, example: "strong-pass-123" })
  @MinLength(8)
  password!: string;
}
