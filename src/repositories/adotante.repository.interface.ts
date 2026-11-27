import { Adotante } from '../entities/adotante.entity';

export const ADOTANTE_REPOSITORY = 'IAdotanteRepository';

export interface IAdotanteRepository {
  listar(): Promise<Adotante[]>;
  buscarPorId(id: number): Promise<Adotante | null>;
  salvar(adotante: Adotante): Promise<Adotante>;
}