import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Dressing } from 'src/entities/dressing.entity';
import { Topping } from 'src/entities/topping.entity';
import { Repository } from 'typeorm';
import { Salad } from '../entities/salad.entity';

@Injectable()
export class SaladService {
  constructor(
    @InjectRepository(Salad)
    private saladRepository: Repository<Salad>,
    @InjectRepository(Topping)
    private toppingRepository: Repository<Topping>,
    @InjectRepository(Dressing)
    private dressingRepository: Repository<Dressing>,
  ) {}

  findAll(): Promise<Salad[]> {
    return this.saladRepository.find();
  }

  findOne(id: string): Promise<Salad> {
    return this.saladRepository.findOneBy({ id });
  }

  add(salad: Salad): Promise<Salad> {
    return this.saladRepository.save(salad);
  }

  async addToppingsToSalad(data: {
    saladId: string;
    toppings: Topping[];
  }): Promise<Salad> {
    const salad = await this.findOne(data.saladId);
    salad.toppings = [...data.toppings];
    return await this.saladRepository.save(salad);
  }

  addTopping(topping: Topping): Promise<Topping> {
    return this.toppingRepository.save(topping);
  }

  findOneTopping(id: number): Promise<Topping> {
    return this.toppingRepository.findOneBy({ id });
  }

  findAllToppings(): Promise<Topping[]> {
    return this.toppingRepository.find();
  }

  addDressing(dressing: Dressing): Promise<Dressing> {
    return this.dressingRepository.save(dressing);
  }

  findOneDressing(id: number): Promise<Dressing> {
    return this.dressingRepository.findOneBy({ id });
  }

  findAllDressings(): Promise<Dressing[]> {
    return this.dressingRepository.find();
  }
}
