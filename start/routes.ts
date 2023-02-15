/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import { Router } from '@adonisjs/core/build/standalone'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {

  Route.get('/listar-usuarios', 'UsuariosController.getListarUsuarios')
  Route.get('/listar-perfil', 'UsuariosController.getListarUsuariosYPerfil')
  Route.get('/listar-publicaciones', 'UsuariosController.getListarUsuariosYPublicacion')
  Route.get('/listar-usuario-grupo', 'UsuariosController.getListarUsuariosGrupos')
  Route.get('buscar-id/:id', 'UsuariosController.getUsuario')
  // Route.get('/filtrar-nombre/:search', 'UsuariosController.filtrarPorNombre')
  Route.get('/filtrar-nombre', 'UsuariosController.filtrarPorNombre')

  Route.post('/registro-usuarios', 'UsuariosController.setRegistrarUsuarios')
  Route.post('/registro-perfil', 'PerfilsController.setRegistrarPerfil')
  Route.post('/registro-publicacion', 'PublicacionesController.setRegistrarPublicacion')
  Route.post('/registro-grupo', 'GruposController.setRegistrarGrupo')
  Route.post('/registro-usuario-grupo', 'GrupoUsuariosController.setRegistrarUsuarioGrupo')

  Route.put('/actualizar-usuario/:id', 'UsuariosController.updateUsuario')

  Route.delete('/eliminar-usuario/:id', 'UsuariosController.deleteUsuario')

}).prefix('api')
