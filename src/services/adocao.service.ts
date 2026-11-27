import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Adocao } from '../entities/adocao.entity';
import { CriarAdocaoDto } from '../dto/criar-adocao.dto';
import { ADOCAO_REPOSITORY } from '../repositories/adocao.repository.interface';
import type { IAdocaoRepository } from '../repositories/adocao.repository.interface';
import { AnimalService } from './animal.service';
import { AdotanteService } from './adotante.service';

@Injectable()
export class AdocaoService {
  constructor(
    @Inject(ADOCAO_REPOSITORY)
    private adocaoRepository: IAdocaoRepository,
    private animalService: AnimalService,
    private adotanteService: AdotanteService,
  ) {}

  listar(): Promise<Adocao[]> {
    return this.adocaoRepository.listar();
  }

  async criar(dto: CriarAdocaoDto): Promise<Adocao> {
    if (!dto.animalId || !dto.adotanteId) {
      throw new BadRequestException('Informe animalId e adotanteId');
    }

    const animal = await this.animalService.buscarPorId(dto.animalId);
    const adotante = await this.adotanteService.buscarPorId(dto.adotanteId);

    if (animal.adotado) {
      throw new BadRequestException('Este animal já foi adotado');
    }

    const adocao = new Adocao();
    adocao.animal = animal;
    adocao.adotante = adotante;

    const adocaoSalva = await this.adocaoRepository.salvar(adocao);
    await this.animalService.marcarComoAdotado(animal);

    return adocaoSalva;
  }
}