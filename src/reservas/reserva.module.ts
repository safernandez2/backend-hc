// reservas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasController } from './reserva.controller';
import { ReservasService } from './reserva.service';
import { Reserva } from './reserva.entity';
import { Habitacion } from '../habitaciones/habitacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Habitacion])], 
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
