import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adocao } from '../entities/adocao.entity';
import { IAdocaoRepository } from './adocao.repository.interface';

@Injectable()
export class AdocaoRepository implements IAdocaoRepository {
  constructor(
    @InjectRepository(Adocao)
    private repo: Repository<Adocao>,
  ) {}

  listar(): Promise<Adocao[]> {
    return this.repo.find({ relations: { animal: true, adotante: true } });
  }

  salvar(adocao: Adocao): Promise<Adocao> {
    return this.repo.save(adocao);
  }
}