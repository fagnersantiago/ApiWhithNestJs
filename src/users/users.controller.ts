import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { UsersService } from './users.services';
import { Clients } from './entities/users.entites';
import * as csvParser from 'csv-parser';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/swagger/swagger';
import { type } from 'os';

@ApiBearerAuth()
@ApiTags('users')
@Controller()
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UsersService) {}

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
    const listUser = await this.userService.get();
    return listUser;
  }

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

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 201, description: 'User deleted.', type: User })
  @ApiResponse({ status: 401, description: 'User not found' })
  public async delete(@Param('id') id: number): Promise<Clients | void> {
    return await this.userService.delete(id);
  }

  @Post('/upload')
  @ApiOperation({ summary: 'Upload file' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseInterceptors(FilesInterceptor('file'))
  public async uploadFile(@UploadedFiles() file: Express.Multer.File) {
    const result = [];

    createReadStream(file.path)
      .pipe(csvParser({ quote: '"', escape: ';' }))
      .on('data', (row) => result.push(row))
      .on('end', async () => {
        const uploadedData = result.forEach(async (item) => {
          await this.userService.UP({
            email: item.email.replace(/"/g, ''),
            name: item.name.replace(/"/g, ''),
            password: item.password.replace(/[";]/g, ''),
          });
        });

        return uploadedData;
      });
  }
}
