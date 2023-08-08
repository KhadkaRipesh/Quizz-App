import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Answer } from './entities/answer.entity';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Injectable()
export class QuizsService {
  constructor(
    @InjectRepository(Quiz) private readonly quizrepo: Repository<Quiz>,
    @InjectRepository(Answer) private readonly ansrepo: Repository<Answer>,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto) {
    const quiz = new Quiz();
    quiz.questionn = createQuizDto.question;
    const savedQuiz = await this.quizrepo.save(quiz);

    for (const option of createQuizDto.options) {
      const answer = new Answer();
      answer.answer = option.answer;
      answer.isCorrect = option.isCorrect;
      answer.quiz = savedQuiz;
      await this.ansrepo.save(answer);
    }

    return savedQuiz;
  }
  async getAllQuiz() {
    return this.quizrepo.find({ select: ['id', 'questionn'] });
  }

  async getQuiz(id: number) {
    const data = await this.quizrepo.findOne({
      where: { id: id },
      relations: ['answers'],
    });
    const answerData = data.answers.map((ans) => ans.answer);
    return {
      question: data.questionn,
      options: answerData,
    };
  }

  async submitQuiz(submitQuizDto: SubmitQuizDto) {
    const { id, answer } = submitQuizDto;
    const question = await this.quizrepo.findOne({
      where: { id: id },
      relations: ['answers'],
    });
    if (question) {
      const correctAnswer = question.answers.find(
        (ans) => ans.answer == answer,
      );
      if (correctAnswer) {
        if (correctAnswer.isCorrect) {
          return { message: "Congratulation. You're right." };
        } else {
          return { message: 'And you call yourself a Rocket Scientist!' };
        }
      } else {
        return { message: 'Enter the valid answer seeing the options.' };
      }
    } else {
      return { message: 'Invalid question choosen.' };
    }
  }
}
