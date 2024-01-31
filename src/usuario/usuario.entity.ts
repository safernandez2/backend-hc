// usuario.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('usuarios')
@Unique(['nombreUsuario']) // Garantiza que los nombres de usuario sean únicos
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'usuarioid' })
  usuarioid: number;

  @Column({ name: 'nombre_usuario',type: 'varchar' })
  nombreUsuario: string;
  
  @Column({ type: 'varchar' }) // Cambiado a 'varchar'
  password: string;
}
