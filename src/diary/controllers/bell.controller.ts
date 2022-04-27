import { Controller, Get, Delete, Body, Query, Param, Post, Patch } from '@nestjs/common';
import { BellService } from '../services/bell.service';
import { createBell, deleteBell, getBell, getBells, updateBell } from '../validations/bell.validation';
import { JoiValidationPipe } from 'src/utils/joi.pipe';

@Controller()
export class BellController {
  constructor(private readonly bellService: BellService) {}

  @Get('diary/bells')
  getPaginated(@Query(new JoiValidationPipe(getBells)) query) {
    return this.bellService.findAndPaginate({}, query.page, query.limit);
  }

  @Get('diary/bells/:id')
  getById(@Param(new JoiValidationPipe(getBell)) params) {
    return this.bellService.findById(params.id);
  }

  @Post('diary/bells')
  post(@Body(new JoiValidationPipe(createBell)) body) {
    return this.bellService.create(body);
  }

  @Patch('diary/bells/:id')
  update(@Param(new JoiValidationPipe(updateBell)) params, @Body(new JoiValidationPipe(updateBell)) body) {
    return this.bellService.update({ _id: params.id }, body);
  }

  @Delete('diary/bells/:id')
  delete(@Param(new JoiValidationPipe(deleteBell)) params) {
    return this.bellService.delete({ _id: params.id });
  }
}
