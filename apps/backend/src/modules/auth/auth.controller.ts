import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiCreatedResponse({
    schema: {
      example: {
        id: "uuid",
        name: "Jane Doe",
        email: "jane@example.com",
      },
    },
  })
  @ApiConflictResponse({ description: "Email already in use." })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  @ApiOkResponse({
    schema: {
      example: {
        accessToken: "jwt-token",
        user: {
          id: "uuid",
          name: "Jane Doe",
          email: "jane@example.com",
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: "Invalid credentials." })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
