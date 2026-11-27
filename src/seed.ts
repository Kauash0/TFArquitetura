import { DataSource } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { Adotante } from './entities/adotante.entity';
import { Adocao } from './entities/adocao.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'abrigo',
  entities: [Animal, Adotante, Adocao],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();

  const animalRepo = dataSource.getRepository(Animal);
  const adotanteRepo = dataSource.getRepository(Adotante);

  if ((await animalRepo.count()) > 0) {
    console.log('Seed já foi executado antes. Nada a fazer.');
    await dataSource.destroy();
    return;
  }

  await animalRepo.save([
    { nome: 'Scott', especie: 'Cachorro', idade: 6 },
    { nome: 'Pipoca', especie: 'Gato', idade: 4 },
    { nome: 'Tintim', especie: 'Cachorro', idade: 5 },
    { nome: 'Baby', especie: 'Gato', idade: 1 },
  ]);

  await adotanteRepo.save([
    { nome: 'Kauã Henrique', telefone: '(66) 99999-1111' },
    { nome: 'Gustavo Lima', telefone: '(66) 99999-2222' },
  ]);

  console.log('Seed executado com sucesso!');
  await dataSource.destroy();
}

seed();