import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salad } from './salad.entity';

@Injectable()
export class SaladService {
  constructor(
    @InjectRepository(Salad)
    private saladRepository: Repository<Salad>,
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
}
