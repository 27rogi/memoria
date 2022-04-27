import { Dependencies, Injectable } from '@nestjs/common';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { hashPassword } from 'src/utils/password';
import { excludedKeys } from 'src/utils/query';
import { User, UserDocument } from '../schemas/user.schema';
import { Role, RoleDocument } from '../schemas/role.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async findWithPermissions(object: FilterQuery<any> = {}, excludeKeys = true) {
    const exclude = excludeKeys ? excludedKeys : null;
    const user = await this.userModel
      .findOne(object, exclude)
      .select('-password')
      .then(async (doc) => {
        const newDoc = doc.toObject();
        if (doc) {
          const role = await this.roleModel.findOne({ roleId: doc.role }, '-_id -roleId');
          if (role) {
            (newDoc as any).role = role.toObject();
          }
        }
        return newDoc;
      });
    return user;
  }

  findAll(object: FilterQuery<any> = {}, excludeKeys = true): Promise<User[]> {
    const exclude = excludeKeys ? excludedKeys : null;
    return this.userModel.find(object, exclude).select('-password -id').exec();
  }

  async findOne(object: FilterQuery<any> = {}, excludeKeys = true) {
    const exclude = excludeKeys ? excludedKeys : null;
    const user = await this.userModel.findOne(object, exclude).exec();

    return user;
  }

  create(body: any) {
    return this.userModel.create({
      ...body,
      password: hashPassword(body.password),
    });
  }

  getUserFromRequest(req: any) {
    if (req.user) return this.findOne({ email: req.user['email'] });
    else return null;
  }
}
