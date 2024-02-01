// usuario.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() usuario: Usuario) {
    return this.usuarioService.create(usuario);
  }
  

  @Get()
  async getAll():Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }


  @Get(':id')
  findById(@Param('id') usuarioid: number) {
    return this.usuarioService.findById(usuarioid);
  }
  @Put(':id')
  update(@Param('id') usuarioid: number, @Body() usuario: Usuario) {
    console.log('Received Data:', usuarioid, usuario);
    return this.usuarioService.update(usuarioid, usuario);
  }

  @Delete(':id')
  delete(@Param('id') usuarioid: number) {
    return this.usuarioService.delete(usuarioid);
  }
  @Post('login') // Nuevo endpoint para autenticación
  async login(@Body() credentials: { nombreUsuario: string; password: string }) {
    try {
      const user = await this.usuarioService.findByCredentials(credentials);

      // Aquí puedes generar y devolver un token JWT
      const token = 'generar-token-aqui';
      
      return { user, token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }
      throw error;
    }
  }
}
