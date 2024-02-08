import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Controller('api/users') //define mi ruta, aqui seria /api/users
export class UsersController {
  constructor(private readonly usersService: UsersService, private config: ConfigService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    // let finalUsers = users.map(user => ({
    //   name: user.first_name,
    //   email: user.email
    // }));


    return {status: 'sucess', user: users};
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
