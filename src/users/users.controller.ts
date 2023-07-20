import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
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
