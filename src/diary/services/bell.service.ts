import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AnyKeys, FilterQuery, Model, Types, PaginateModel, Connection } from 'mongoose';
import { excludedKeys, paginationLabels } from 'src/utils/query';
import { Bell, BellDocument, BellSchema } from '../schemas/bell.schema';

interface IAnyMethod extends Document {
  [key: string]: any;
}

type BellModel<T extends Document> = PaginateModel<T>;

@Injectable()
export class BellService {
  constructor(@InjectModel(Bell.name) private bellModel: Model<BellDocument>, @InjectConnection() private connection: Connection) {}

  create(body: AnyKeys<BellDocument>) {
    return this.bellModel.create(body);
  }

  async findAndPaginate(object: FilterQuery<any> = {}, page = 1, limit = 24) {
    const bellPaginatedModel: BellModel<IAnyMethod> = this.connection.model<IAnyMethod>('Bell', BellSchema) as BellModel<IAnyMethod>;
    return await bellPaginatedModel.paginate(object, {
      page: page,
      limit: limit,
      select: [...excludedKeys, '_id'],
      customLabels: paginationLabels,
    });
  }

  find(object: FilterQuery<any> = {}) {
    return this.bellModel.find(object, excludedKeys).select('_id').exec();
  }

  findOne(object: FilterQuery<any> = {}) {
    return this.bellModel.findOne(object, excludedKeys).select('_id').exec();
  }

  findById(id: any) {
    return this.bellModel.findById(new Types.ObjectId(id), excludedKeys).select('_id').exec();
  }

  async update(object: FilterQuery<any> = {}, body: AnyKeys<BellDocument>) {
    const bell = await this.bellModel.findOne(object);
    if (!bell) {
      throw HttpException.createBody('404', 'Not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(bell, body);
    await bell.save();
    return bell;
  }

  async delete(object: FilterQuery<any> = {}) {
    const bell = await this.bellModel.findOne(object);
    if (!bell) {
      throw HttpException.createBody('404', 'Not found', HttpStatus.NOT_FOUND);
    }
    await bell.remove();
    return bell;
  }
}
