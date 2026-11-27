import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Animal } from './entities/animal.entity';
import { Adotante } from './entities/adotante.entity';
import { Adocao } from './entities/adocao.entity';

import { AnimalController } from './controllers/animal.controller';
import { AdotanteController } from './controllers/adotante.controller';
import { AdocaoController } from './controllers/adocao.controller';

import { AnimalService } from './services/animal.service';
import { AdotanteService } from './services/adotante.service';
import { AdocaoService } from './services/adocao.service';

import { ANIMAL_REPOSITORY } from './repositories/animal.repository.interface';
import { ADOTANTE_REPOSITORY } from './repositories/adotante.repository.interface';
import { ADOCAO_REPOSITORY } from './repositories/adocao.repository.interface';
import { AnimalRepository } from './repositories/animal.repository';
import { AdotanteRepository } from './repositories/adotante.repository';
import { AdocaoRepository } from './repositories/adocao.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'abrigo',
      entities: [Animal, Adotante, Adocao],
      synchronize: true, // cria as tabelas automaticamente (ok para estudo)
    }),
    TypeOrmModule.forFeature([Animal, Adotante, Adocao]),
  ],
  controllers: [AnimalController, AdotanteController, AdocaoController],
  providers: [
    AnimalService,
    AdotanteService,
    AdocaoService,
    { provide: ANIMAL_REPOSITORY, useClass: AnimalRepository },
    { provide: ADOTANTE_REPOSITORY, useClass: AdotanteRepository },
    { provide: ADOCAO_REPOSITORY, useClass: AdocaoRepository },
  ],
})
export class AppModule {}