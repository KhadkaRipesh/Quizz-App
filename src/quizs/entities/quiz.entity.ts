import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from './answer.entity';

@Entity({ name: 'quizs' })
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionn: string;

  @OneToMany(() => Answer, (answer) => answer.quiz)
  answers: Answer[];
}
