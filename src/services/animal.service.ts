import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Animal } from '../entities/animal.entity';
import { CriarAnimalDto } from '../dto/criar-animal.dto';
import { ANIMAL_REPOSITORY } from '../repositories/animal.repository.interface';
import type { IAnimalRepository } from '../repositories/animal.repository.interface';

@Injectable()
export class AnimalService {
  constructor(
    @Inject(ANIMAL_REPOSITORY)
    private animalRepository: IAnimalRepository,
  ) {}

  listar(): Promise<Animal[]> {
    return this.animalRepository.listar();
  }

  async buscarPorId(id: number): Promise<Animal> {
    const animal = await this.animalRepository.buscarPorId(id);
    if (!animal) {
      throw new NotFoundException('Animal não encontrado');
    }
    return animal;
  }

  criar(dto: CriarAnimalDto): Promise<Animal> {
    if (!dto.nome || !dto.especie || dto.idade === undefined) {
      throw new BadRequestException('Informe nome, especie e idade');
    }

    const animal = new Animal();
    animal.nome = dto.nome;
    animal.especie = dto.especie;
    animal.idade = dto.idade;
    animal.adotado = false;

    return this.animalRepository.salvar(animal);
  }

  async marcarComoAdotado(animal: Animal): Promise<void> {
    animal.adotado = true;
    await this.animalRepository.salvar(animal);
  }
}