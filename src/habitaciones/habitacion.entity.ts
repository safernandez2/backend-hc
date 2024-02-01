// habitacion.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reserva } from 'src/reservas/reserva.entity';
import { forwardRef } from '@nestjs/common'; // Importa forwardRef

@Entity('habitaciones')
export class Habitacion {
  @PrimaryGeneratedColumn({ name: 'habitacionid' })
  habitacionid: number;

  @Column({ name: 'nombre_habitacion' })
  nombreHabitacion: string;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'capacidad' })
  capacidad: number;

  @Column({name:'imagen_url', nullable:true,type: 'text'})
  imagenUrl:string | null;

  @OneToMany(() => Reserva, reserva => reserva.habitacion)
  reservas: Reserva[];
}
