import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdocaoService } from '../services/adocao.service';
import { CriarAdocaoDto } from '../dto/criar-adocao.dto';

@Controller('adocoes')
export class AdocaoController {
  constructor(private adocaoService: AdocaoService) {}

  @Get()
  listar() {
    return this.adocaoService.listar();
  }

  @Post()
  criar(@Body() dto: CriarAdocaoDto) {
    return this.adocaoService.criar(dto);
  }
}