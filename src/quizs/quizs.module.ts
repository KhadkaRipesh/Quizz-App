import { Module } from '@nestjs/common';
import { QuizsController } from './quizs.controller';
import { QuizsService } from './quizs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Answer])],
  controllers: [QuizsController],
  providers: [QuizsService],
})
export class QuizsModule {}
