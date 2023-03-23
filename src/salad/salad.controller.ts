import { Controller, Get, Param } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Salad } from './salad.entity';
import { SaladService } from './salad.service';

@Controller('salad')
export class SaladController {
  constructor(private saladService: SaladService) {}

  @Get()
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

  // @EventPattern('create_salade')
  @MessagePattern('create_salade')
  async handleCreateSalad(data: Salad): Promise<Salad> {
    const createdSalad = await this.saladService.add(data);
    console.log(createdSalad);
    return createdSalad;
  }
}
