import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publicacione from 'App/Models/Publicacione'

export default class PublicacionesController {

    public async setRegistrarPublicacion({request, response}: HttpContextContract){
        try{
            const dataPublicacion = request.only(['codigo_publicacion', 'codigo_usuario','titulo','cuerpo'])
            const codigoPublicacion = dataPublicacion.codigo_publicacion
            const publicacionExistente: Number = await this.getValidarPublicacionExistente(codigoPublicacion)
            if(publicacionExistente === 0){
                await Publicacione.create(dataPublicacion)
                response.status(200).json({"msg": "Publicacion registrada con exito"})
            } else {
                response.status(400).json({"msg": "Este codigo de publicacion ya se encuentra registrado"})
            }
        } catch(error){
            console.log(error)
            response.status(500).json({"msg": "Error en el servidor !"})
        }
    }

    private async getValidarPublicacionExistente(codigo_publicacion: Number): Promise<Number> {
        const total = await Publicacione.query().where({"codigo_publicacion":codigo_publicacion}).count('*').from('publicaciones')
        return parseInt(total[0]["count(*)"])
    }

}
