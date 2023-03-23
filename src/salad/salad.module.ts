import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salad } from '../entities/salad.entity';
import { SaladService } from './salad.service';
import { SaladController } from './salad.controller';
import { Dressing } from 'src/entities/dressing.entity';
import { Topping } from 'src/entities/topping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Salad, Topping, Dressing])],
  providers: [SaladService],
  controllers: [SaladController],
})
export class SaladModule {}
