import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizsService } from './quizs.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Controller('quizs')
export class QuizsController {
  constructor(private readonly quizService: QuizsService) {}
  @Post()
  createQuestion(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Get(':id')
  getQuiz(@Param('id') id: string) {
    return this.quizService.getQuiz(+id);
  }

  @Post('/submit')
  submitQuiz(@Body() submitQuizDto: SubmitQuizDto) {
    return this.quizService.submitQuiz(submitQuizDto);
  }

  @Get()
  getAllQuiz() {
    return this.quizService.getAllQuiz();
  }
}
