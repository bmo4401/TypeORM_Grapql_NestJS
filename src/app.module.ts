import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from 'src/event/controllers/event.controller';
import { EventModule } from './event/event.module';
import { Event } from 'src/event/entities/event.entity';
import { AppJapanService } from 'src/app.japan.service';
import { AppDummy } from 'src/app.dummy';
import { ConfigModule } from '@nestjs/config';
import ormConfig from 'src/config/orm.config';
import ormConfigProd from 'src/config/orm.config.prod';
import { AuthModule } from 'src/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SchoolModule } from 'src/school/school.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true, //use variable in .env
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    EventModule,
    AuthModule,
    SchoolModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
  ],

  controllers: [AppController],
  providers: [
    { provide: AppService, useClass: AppJapanService },
    {
      provide: 'APP_NAME',
      useValue: 'BACKEND_API',
    },
    {
      provide: 'MESSAGE',
      inject: [AppDummy],
      useFactory: (app) => `${app.dummy()} Factory`,
    },
    AppDummy,
  ],
})
export class AppModule {}
