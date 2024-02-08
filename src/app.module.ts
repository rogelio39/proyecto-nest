import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { SessionsModule } from './sessions/sessions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestModule } from '@nestjs/common';
import FirstMiddleware from './middlewares/FirstMiddleware';


@Module({
  imports: [
    ConfigModule.forRoot(),
    //utilizar un .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config:ConfigService) => ({
        uri: config.get<string>("MONGO_URL")
      }),
    }), 
    UsersModule,
    ProductsModule,
    CartsModule,
    SessionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  //configurara todo los middleware

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes({path: "*", method:RequestMethod.ALL});
  }
}
