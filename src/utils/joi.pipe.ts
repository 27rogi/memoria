import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

interface RequestObjectSchema {
  body?: ObjectSchema;
  query?: ObjectSchema;
  param?: ObjectSchema;
}

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: RequestObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema[metadata.type].prefs({ errors: { label: 'key' }, abortEarly: false }).validate(value);
    if (error) {
      throw new BadRequestException(error.details);
    }
    return value;
  }
}
