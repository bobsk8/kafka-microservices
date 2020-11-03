import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      logging: true,
      entities: [
        User,
      ]
    }), UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
