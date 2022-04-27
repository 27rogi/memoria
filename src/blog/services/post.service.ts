import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AnyKeys, FilterQuery, Model, Types, PaginateModel, Connection } from 'mongoose';
import { excludedKeys, paginationLabels } from 'src/utils/query';
import { Post, PostDocument, PostSchema } from '../schemas/post.schema';

interface IAnyMethod extends Document {
  [key: string]: any;
}

type PostModel<T extends Document> = PaginateModel<T>;

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>, @InjectConnection() private connection: Connection) {}

  create(body: AnyKeys<PostDocument>) {
    return this.postModel.create(body);
  }

  async findAndPaginate(object: FilterQuery<any> = {}, page = 1, limit = 24) {
    const postPaginatedModel: PostModel<IAnyMethod> = this.connection.model<IAnyMethod>('Post', PostSchema) as PostModel<IAnyMethod>;
    return await postPaginatedModel.paginate(object, {
      page: page,
      limit: limit,
      select: [...excludedKeys, '_id'],
      customLabels: paginationLabels,
    });
  }

  find(object: FilterQuery<any> = {}) {
    return this.postModel.find(object, excludedKeys).select('_id').exec();
  }

  async findOne(object: FilterQuery<any> = {}) {
    const post = await this.postModel.findOne(object, excludedKeys).select('_id').exec();
    if (!post) throw HttpException.createBody('Not found', '404', HttpStatus.NOT_FOUND);
    return post;
  }

  findById(id: any) {
    return this.postModel.findById(new Types.ObjectId(id), excludedKeys).select('_id').exec();
  }

  async update(object: FilterQuery<any> = {}, body: AnyKeys<PostDocument>) {
    const doc = await this.postModel.findOne(object);
    if (!doc) {
      throw HttpException.createBody('404', 'Not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(doc, body);
    await doc.save();
    return doc;
  }

  async delete(object: FilterQuery<any> = {}) {
    const doc = await this.postModel.findOne(object);
    if (!doc) {
      throw HttpException.createBody('404', 'Not found', HttpStatus.NOT_FOUND);
    }
    await doc.remove();
    return doc;
  }
}
