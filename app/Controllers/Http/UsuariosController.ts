import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Usuario from "App/Models/Usuario";

export default class UsuariosController {

  public async getListarUsuarios(): Promise<Usuario[]> {
    const user = await Usuario.all();
    return user;
  }

  public async getListarUsuariosYPerfil(): Promise<Usuario[]> {
    const user = await Usuario.query().preload("perfil");
    return user;
  }

  public async getListarUsuariosYPublicacion(): Promise<Usuario[]> {
    const user = await Usuario.query().preload("publicacione");
    return user;
  }

  public async getListarUsuariosGrupos(): Promise<Usuario[]> {
    const user = await Usuario.query().preload("usuario_grupos");
    return user;
  }

  public async getUsuario({request}: HttpContextContract){
    const id = request.param('id');
    const user = await Usuario.find(id);
    return user;
  }
  
  public async updateUsuario({request}: HttpContextContract){
    const id = request.param('id');
    const datos = request.all();
    const usuario = await Usuario.findOrFail(id);
    usuario.nombre_usuario = datos.nombre_usuario,
    usuario.contrasena = datos.contrasena,
    usuario.email = datos.email,
    usuario.telefono = datos.telefono,
    await usuario.save();
    return {"msg":"Usuario actualizado correctamente", "estado":200};
  }

  public async deleteUsuario({request}: HttpContextContract){
    const id = request.param('id');
    await Usuario.query().where('codigo_usuario', id).delete();
    return 'Usuario eleminado';
  }

  public async filtrarPorNombre({request}: HttpContextContract){
    const {search} = request.all();
    const users = await Usuario.query().where('nombre_usuario','like',`${search}%`);
    return users;
  }

  public async setRegistrarUsuarios({request, response}: HttpContextContract){
    
    const dataUsuario = request.only(['codigo_usuario', 'nombre_usuario', 'contrasena',  'email', 'telefono', 'perfil'])
    try{
      const codigoUsuario = dataUsuario.codigo_usuario
      const usuarioExistente: Number = await this.getValidarUsuarioExistente(codigoUsuario)
      if(usuarioExistente === 0){
        await Usuario.create(dataUsuario)
        response.status(200).json({"msg": "Registro completado con exito"})
      } else{
        response.status(400).json({"msg": "Este codigo de usuario ya se encuentra registrado"})
      }
    } catch(error){
      console.log(error)
      response.status(500).json({"msg": "Error en el servidor !"})
    }

  }

  private async getValidarUsuarioExistente(codigo_usuario: Number): Promise<Number>{
    const total = await Usuario.query().where({"codigo_usuario":codigo_usuario}).count('*').from('usuarios')
    return parseInt(total[0]["count(*)"])
  }

}
