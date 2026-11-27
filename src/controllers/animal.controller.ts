import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnimalService } from '../services/animal.service';
import { CriarAnimalDto } from '../dto/criar-animal.dto';

@Controller('animais')
export class AnimalController {
  constructor(private animalService: AnimalService) {}

  @Get()
  listar() {
    return this.animalService.listar();
  }

  @Post()
  criar(@Body() dto: CriarAnimalDto) {
    return this.animalService.criar(dto);
  }
}