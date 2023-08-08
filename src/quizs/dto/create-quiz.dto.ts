import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

class AnswerDto {
  @IsNotEmpty()
  answer: string;

  @IsNotEmpty()
  isCorrect: boolean;
}
export class CreateQuizDto {
  @IsNotEmpty()
  question: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  options: AnswerDto[];
}
