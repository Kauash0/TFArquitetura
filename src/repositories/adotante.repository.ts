import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adotante } from '../entities/adotante.entity';
import { IAdotanteRepository } from './adotante.repository.interface';

@Injectable()
export class AdotanteRepository implements IAdotanteRepository {
  constructor(
    @InjectRepository(Adotante)
    private repo: Repository<Adotante>,
  ) {}

  listar(): Promise<Adotante[]> {
    return this.repo.find();
  }

  buscarPorId(id: number): Promise<Adotante | null> {
    return this.repo.findOneBy({ id });
  }

  salvar(adotante: Adotante): Promise<Adotante> {
    return this.repo.save(adotante);
  }
}