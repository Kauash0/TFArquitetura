import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Adotante } from '../entities/adotante.entity';
import { CriarAdotanteDto } from '../dto/criar-adotante.dto';
import { ADOTANTE_REPOSITORY } from '../repositories/adotante.repository.interface';
import type { IAdotanteRepository } from '../repositories/adotante.repository.interface';

@Injectable()
export class AdotanteService {
  constructor(
    @Inject(ADOTANTE_REPOSITORY)
    private adotanteRepository: IAdotanteRepository,
  ) {}

  listar(): Promise<Adotante[]> {
    return this.adotanteRepository.listar();
  }

  async buscarPorId(id: number): Promise<Adotante> {
    const adotante = await this.adotanteRepository.buscarPorId(id);
    if (!adotante) {
      throw new NotFoundException('Adotante não encontrado');
    }
    return adotante;
  }

  criar(dto: CriarAdotanteDto): Promise<Adotante> {
    if (!dto.nome || !dto.telefone) {
      throw new BadRequestException('Informe nome e telefone');
    }

    const adotante = new Adotante();
    adotante.nome = dto.nome;
    adotante.telefone = dto.telefone;

    return this.adotanteRepository.salvar(adotante);
  }
}