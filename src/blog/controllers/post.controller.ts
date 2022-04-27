import { Controller, Get, Delete, Body, Query, Param, Post, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions } from 'src/utils/permissions.decorator';
import { JoiValidationPipe } from 'src/utils/joi.pipe';
import { PostService } from '../services/post.service';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../validations/post.validation';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('blog/posts')
  getPaginated(@Query(new JoiValidationPipe(getPosts)) query) {
    return this.postService.findAndPaginate({}, query.page, query.limit);
  }

  @Get('blog/posts/:name')
  async getById(@Param(new JoiValidationPipe(getPost)) params) {
    return this.postService.findOne({ name: params.name });
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('createPosts')
  @Post('blog/posts')
  post(@Body(new JoiValidationPipe(createPost)) body) {
    return this.postService.create(body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('updatePosts')
  @Patch('blog/posts/:id')
  update(@Param(new JoiValidationPipe(updatePost)) params, @Body(new JoiValidationPipe(updatePost)) body) {
    return this.postService.update({ _id: params.id }, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('deletePosts')
  @Delete('blog/posts/:id')
  delete(@Param(new JoiValidationPipe(deletePost)) params) {
    return this.postService.delete({ _id: params.id });
  }
}
