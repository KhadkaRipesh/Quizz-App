import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity({ name: 'answers' })
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => Quiz, (quiz) => quiz.answers)
  quiz: Quiz;
}
