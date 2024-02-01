// reserva.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Habitacion } from '../habitaciones/habitacion.entity';
import { forwardRef } from '@nestjs/common';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn({ name: 'reservaid' })
  reservaid: number;

  @Column({ name: 'habitacionid' })
  habitacionid: number;

  @Column({ name: 'nombre_cliente' })
  nombreCliente: string;

  @Column({ name: 'correo_cliente' })
  correoCliente: string;

  @Column({ name: 'fecha_inicio', type: 'timestamp' })
  fechaInicio: Date;

  @Column({ name: 'fecha_fin', type: 'timestamp' })
  fechaFin: Date;

  @Column({ name: 'numero_cliente'})
  numeroCliente: string;

  @ManyToOne(() => Habitacion, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'habitacionid' })
habitacion: Habitacion;
}
