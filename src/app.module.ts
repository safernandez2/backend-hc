import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitacionesModule } from './habitaciones/habitaciones.module';  // Ajusta según la estructura de tu proyecto
import { Habitacion } from './habitaciones/habitacion.entity';
import { ReservasModule } from './reservas/reserva.module';
import { Reserva } from './reservas/reserva.entity';
import { Usuario } from './usuario/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'hosteriacap',
      entities: [Habitacion, Reserva, Usuario],
      synchronize: false,
    }),
    HabitacionesModule, 
    ReservasModule,
    UsuarioModule,
     // Ajusta según la estructura de tu proyecto
  ],
  
})
export class AppModule {}