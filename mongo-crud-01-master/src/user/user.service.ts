import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  // Método para crear un documento nuevo en Mongo
  async create(name: string, surname: string, points: number) {

    const newUser = new this.userModel({ name, surname, points });
    const result = await newUser.save();

    return result.id as string;
  }

  async findAll() {

    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      surname: user.surname,
      points: user.points,
    }));

  }

  async findOne(id: string) {

    const user = await this.findUser(id);
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      points: user.points
    }; // Devolver un JSON
  }

  // Se reciben todos los campos del objeto User
  async update(id: string, name: string, surname: string, points: number) {
    const user = await this.findUser(id);
    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (points) user.points = points;
    user.save();
    return `This action updates a #${id} user`;
  }

  // Borra un objeto de la base de datos con base en su Id
  async remove(id: string) {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if(result.n === 0){
      throw new NotFoundException('No se pudo encontrar el usuario para eliminar');
    }
  }

  // Función para devolver un único objeto de la clase User
  private async findUser(id: string): Promise<User> {
    let user: any;

    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('No se encontró el usuario');
    }

    return user;

  }

}
