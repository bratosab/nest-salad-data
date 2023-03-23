import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salad } from './salad.entity';
import { SaladService } from './salad.service';
import { SaladController } from './salad.controller';

export const ENTITIES = [Salad];

@Module({
  imports: [TypeOrmModule.forFeature([...ENTITIES])],
  providers: [SaladService],
  controllers: [SaladController],
})
export class SaladModule {}
