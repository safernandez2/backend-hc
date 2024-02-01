// usuario.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }
 
  async findById(usuarioid: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioid: usuarioid },
    });
  
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuarioid} no encontrado`);
    }
  
    return usuario;
  }
  
  
  async update(usuarioid: number, usuarioData: Usuario): Promise<Usuario> {
    const usuario = await this.findById(usuarioid); // Obtener el usuario existente
  
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuarioid} no encontrado`);
    }
  
    // Actualizar el usuario con los nuevos datos
    usuario.nombreUsuario = usuarioData.nombreUsuario || usuario.nombreUsuario;
    usuario.password = usuarioData.password || usuario.password;
  
    // Guardar el usuario actualizado
    return this.usuarioRepository.save(usuario);
  }
  
  async delete(usuarioid: number): Promise<void> {
    const result = await this.usuarioRepository.delete(usuarioid);

    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${usuarioid} no encontrado`);
    }
  }

  async findByCredentials(credentials: { nombreUsuario: string; password: string }): Promise<Usuario | null> {
    const { nombreUsuario, password } = credentials;

    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.nombreUsuario = :nombreUsuario', { nombreUsuario })
      .andWhere('usuario.password = :password', { password })  // ¡Asegúrate de que estás comparando las contraseñas de manera segura!
      .getOne();

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return usuario;
  }

}
