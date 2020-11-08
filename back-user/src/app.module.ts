import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  controllers: [],
  providers: [],
})
export class AppModule { }
