import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { User } from './entities/user.entity';

@Module({
  imports: [CoreModule, 
    TypeOrmModule.forRoot({
      logging: true,
      entities: [
        User,
      ]
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
