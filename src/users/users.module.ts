import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UserSchema } from 'src/users/schemas/user.schema';
import AutoIncrementFactory from 'mongoose-sequence';
import { UsersService } from './services/users.service';
import { UsersController } from 'src/users/controllers/users.controller';
import { User } from './schemas/user.schema';
import { Role, RoleSchema } from './schemas/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: (connection: Connection) => {
          const AutoIncrement = AutoIncrementFactory(connection);

          const schema = UserSchema;
          schema.plugin(AutoIncrement, {
            inc_field: 'userId',
            start_seq: 0,
          });

          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
