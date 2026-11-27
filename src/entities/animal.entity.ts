import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  especie: string;

  @Column()
  idade: number;

  @Column({ default: false })
  adotado: boolean;
}