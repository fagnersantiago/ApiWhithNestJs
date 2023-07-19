import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { UsersService } from './users.services';
import { Clients } from './entities/users.entites';
import * as csvParser from 'csv-parser';
@Controller()
export class UserController {
  constructor(private userService: UsersService) {}

  @Get()
  public async getAll() {
    const listUser = await this.userService.get();
    return listUser;
  }

  @Post('/clients')
  public async create(@Body() user: Clients): Promise<Clients> {
    const userCreated = await this.userService.create(user);
    return userCreated;
  }
  /* eslint-disable prettier/prettier */
  @Delete('/:id')
  public async delete(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(Number(id));
  }

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFile(@UploadedFiles() file) {
    const result = [];

    createReadStream(file.path)
      .pipe(csvParser())
      .on('data', (data) => result.push(data))
      .on('end', () => {
        console.log(result);
      });
  }
}
