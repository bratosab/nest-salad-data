import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Salad } from './salad/salad.entity';
import { SaladModule, ENTITIES as SaladEntities } from './salad/salad.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'salad-maria',
      synchronize: true,
      entities: [...SaladEntities],
    }),
    SaladModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
