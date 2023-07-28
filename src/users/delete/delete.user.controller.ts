/* eslint-disable prettier/prettier */
import { User } from '../../swagger/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Delete, Controller, UseGuards, Param } from '@nestjs/common';
import { DeleteUserService } from './delete.user.service';
import { Clients } from '../entities/users.entites';

@ApiBearerAuth()
@ApiTags('users')
@Controller()
@UseGuards(AuthGuard('jwt'))
export class DeleteUserController {
  constructor(private deleteUserRepository: DeleteUserService) {}

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 201, description: 'User deleted.', type: User })
  @ApiResponse({ status: 401, description: 'User not found' })
  public async delete(@Param('id') id: number): Promise<Clients | void> {
    return await this.deleteUserRepository.delete(id);
  }
}
