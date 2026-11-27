import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from '../entities/animal.entity';
import { IAnimalRepository } from './animal.repository.interface';

@Injectable()
export class AnimalRepository implements IAnimalRepository {
  constructor(
    @InjectRepository(Animal)
    private repo: Repository<Animal>,
  ) {}

  listar(): Promise<Animal[]> {
    return this.repo.find();
  }

  buscarPorId(id: number): Promise<Animal | null> {
    return this.repo.findOneBy({ id });
  }

  salvar(animal: Animal): Promise<Animal> {
    return this.repo.save(animal);
  }
}