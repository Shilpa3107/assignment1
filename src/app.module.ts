import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModuleModule } from './user-module/user-module.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      password: 'abc123',
      username: 'postgres',
      entities: [],
      database: 'postgresql',
      synchronize: true,
      logging: true,
    }),
     UserModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
