import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEnity } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma:PrismaService ){}

  async create(createUserDto: CreateUserDto):Promise<UserEnity> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const data = {...createUserDto, password:hashedPassword}
      
    return await this.prisma.user.create({
        data
    })
  }

 async findOneByEmail(email: string):Promise<Object> {
    return await this.prisma.user.findUnique({
        where:{
          email
        },
       select:{
        id:true,
        email:true,
        name:true,
        profileId:true
       } 
    });
  }

  async findAll():Promise<UserEnity[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number):Promise<UserEnity> {
    return await this.prisma.user.findUnique({
        where:{
            id
        }
    });
  }

  async findGegister(email: string):Promise<UserEnity> {
    return await this.prisma.user.findUnique({
        where:{
            email
        }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<UserEnity> {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    const data = {...updateUserDto, password:hashedPassword}
    return await this.prisma.user.update({
        where:{
            id,
        },
        data
    })
  }

  async remove(id: number):Promise<UserEnity> {
    return await this.prisma.user.delete({
        where:{
            id
        }
    })
  }
}
