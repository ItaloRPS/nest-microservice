import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEnity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';


@Injectable()
export class UserService {
  constructor(private readonly User:UserRepository){}

  async create(createUserDto: CreateUserDto):Promise<UserEnity> {

    return await this.User.create(createUserDto)
  }

  async findOrCreateUser(createUserDto: CreateUserDto):Promise<any> {
    const {email} = createUserDto
    const user = await this.findOneByEmail(email)
    if (!user) {
      return await this.User.create(createUserDto)
    }
    return user;
  }

  async findAll():Promise<UserEnity[]> {
    return await this.User.findAll()
  }

  async findOne(id: number):Promise<UserEnity> {
    return await this.User.findOne(id)
  }

  async findGegister(email: string):Promise<UserEnity> {
    return await this.User.findGegister(email)
  }

  async findOneByEmail(email: string):Promise<Object> {
    return await this.User.findOneByEmail(email)
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<UserEnity> {
    const user = this.User.findOne(id)
    if(!user){
      new NotFoundError("User not Found.")
    }
    return await this.User.update(id,updateUserDto)
  }

  async remove(id: number):Promise<UserEnity> {
    const user = this.User.findOne(id)
    if(!user){
      new NotFoundError("User not Found.")
    }
    return await this.User.remove(id)
  }
}
