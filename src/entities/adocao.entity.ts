import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Animal } from './animal.entity';
import { Adotante } from './adotante.entity';

@Entity()
export class Adocao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Animal)
  animal: Animal;

  @ManyToOne(() => Adotante)
  adotante: Adotante;

  @CreateDateColumn()
  dataAdocao: Date;
}