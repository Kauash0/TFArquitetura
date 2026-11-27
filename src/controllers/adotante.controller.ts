import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdotanteService } from '../services/adotante.service';
import { CriarAdotanteDto } from '../dto/criar-adotante.dto';

@Controller('adotantes')
export class AdotanteController {
  constructor(private adotanteService: AdotanteService) {}

  @Get()
  listar() {
    return this.adotanteService.listar();
  }

  @Post()
  criar(@Body() dto: CriarAdotanteDto) {
    return this.adotanteService.criar(dto);
  }
}