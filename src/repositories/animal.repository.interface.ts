import { Animal } from '../entities/animal.entity';

export const ANIMAL_REPOSITORY = 'IAnimalRepository';

export interface IAnimalRepository {
  listar(): Promise<Animal[]>;
  buscarPorId(id: number): Promise<Animal | null>;
  salvar(animal: Animal): Promise<Animal>;
}