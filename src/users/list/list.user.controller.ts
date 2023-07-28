/* eslint-disable prettier/prettier */
import { User } from '../../swagger/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Get, Controller, UseGuards } from '@nestjs/common';
import { ListUserService } from './list.user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller()
@UseGuards(AuthGuard('jwt'))
export class ListUserController {
  constructor(private userRepository: ListUserService) {}
  @Get()
  @ApiOperation({ summary: 'Get all User' })
  @ApiResponse({
    status: 200,
    description: 'List all user',
    type: User,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Unauthorized',
    schema: {
      example: {
        message: 'Not found',
        statusCode: 404,
      },
    },
  })
  public async getAll() {
    const listUser = await this.userRepository.get();
    return listUser;
  }
}
