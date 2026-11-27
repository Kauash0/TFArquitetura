import { Adocao } from '../entities/adocao.entity';

export const ADOCAO_REPOSITORY = 'IAdocaoRepository';

export interface IAdocaoRepository {
  listar(): Promise<Adocao[]>;
  salvar(adocao: Adocao): Promise<Adocao>;
}