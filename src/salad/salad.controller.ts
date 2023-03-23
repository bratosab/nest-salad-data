import { Controller, Get, Param } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Dressing } from 'src/entities/dressing.entity';
import { Topping } from 'src/entities/topping.entity';
import { Salad } from '../entities/salad.entity';
import { SaladService } from './salad.service';

@Controller('salad')
export class SaladController {
  constructor(private saladService: SaladService) {}

  @Get()
  @MessagePattern('get_salads')
  async getAll(): Promise<Salad[]> {
    const salads = await this.saladService.findAll();
    console.log(salads);
    return salads;
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Salad> {
    const found = await this.saladService.findOne(id);
    console.log(found);
    return found;
  }

  // @EventPattern('create_salad')
  @MessagePattern('create_salad')
  async handleCreateSalad(data: Salad): Promise<Salad> {
    const createdSalad = await this.saladService.add(data);
    console.log(createdSalad);
    return createdSalad;
  }

  @MessagePattern('add_toppings_salad')
  async handleAddToppingsToSalad(data: {
    saladId: string;
    toppings: Topping[];
  }): Promise<Salad> {
    const createdSalad = await this.saladService.addToppingsToSalad(data);
    console.log(createdSalad);
    return createdSalad;
  }

  @MessagePattern('get_toppings')
  handleGetToppings(): Promise<Topping[]> {
    return this.saladService.findAllToppings();
  }

  @MessagePattern('create_topping')
  handleCreateTopping(data: Topping): Promise<Topping> {
    return this.saladService.addTopping(data);
  }

  @MessagePattern('get_dressings')
  handleGetDressings(): Promise<Dressing[]> {
    return this.saladService.findAllDressings();
  }

  @MessagePattern('create_dressing')
  async handleCreateDressing(data: Dressing): Promise<Dressing> {
    return await this.saladService.addDressing(data);
  }
}
