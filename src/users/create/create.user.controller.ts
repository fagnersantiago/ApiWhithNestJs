/* eslint-disable prettier/prettier */
import { User } from '../../swagger/swagger';
import { Clients } from '../entities/users.entites';
import { CreteUserService } from './create.user.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

@ApiBearerAuth()
@ApiTags('users')
@Controller()
@UseGuards(AuthGuard('jwt'))
export class CreateUserController {
  constructor(private userService: CreteUserService) {}
  @Post('/clients')
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  public async create(@Body() user: Clients): Promise<Clients> {
    const userCreated = await this.userService.create(user);
    return userCreated;
  }
}
