import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // console.log(metadata.type);

    const validationResult = this.schema.validate(value, { abortEarly: false });

    if (validationResult.error)
      throw new BadRequestException(validationResult.error.message);

    return value;
  }
}
