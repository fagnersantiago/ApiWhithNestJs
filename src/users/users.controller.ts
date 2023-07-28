import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { UsersService } from './users.services';

import * as csvParser from 'csv-parser';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller()
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UsersService) {}

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
