import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Adotante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  telefone: string;
}