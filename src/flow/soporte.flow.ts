import { addKeyword, EVENTS } from '@builderbot/bot';
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { addStringToBlacklist, enviarMensaje } from '../utils/utils';
import { numberClean } from './mute.flow';
import { reset, stop } from '../idle-custom'
import { redireccionarFlow } from './redireccionar.flow'

export const soporteFlow = addKeyword<Provider, Database>('soporte')
    .addAnswer(
        [
            '*¡Gracias por tu interés en nuestros servicios! 🌟*',
            '',
            '🛠️ Entiendo que necesitas soporte técnico. Por favor, selecciona una de las siguientes opciones para que podamos asistirte mejor:',
            '1️⃣ Errores en la aplicación',
            '2️⃣ Otras consultas técnicas',
            '',
            'O escribe "menu" para volver al menú principal.'
        ].join('\n'),
        {capture: true},
        async (ctx, { gotoFlow, fallBack, state}) => {
                reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
                const opcion = ctx.body
                switch (opcion) {
                    case '1': {

                        
                        await state.update({ mensaje_asesor: process.env.MENSAJE_SOPORTE_ERROR_APP })    
                        await state.update({ tel_asesor: process.env.SOPORTE_ERROR_APP })    
                        return gotoFlow(redireccionarFlow)
                    }
                    case '2': {
                        await state.update({ mensaje_asesor: 'opcion 2' })    
                        await state.update({ tel_asesor: process.env.SOPORTE_ERROR_OTRAS })    
                        return gotoFlow(redireccionarFlow)
                    }
    
                    default: {
                       return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟..')
                    }
                }
            },
    )
    .addAction(async (ctx, { blacklist, flowDynamic}) => {
        // const toMute = numberClean(ctx.from);
        console.log("entro")
        // await  addStringToBlacklist(toMute);
        // blacklist.add(toMute);
        // await  ejemploEnviarMensaje(toMute);
        return;
    })


    // Ejemplo de uso de la función enviarMensaje
    async function ejemploEnviarMensaje(numeroAtencion) {
        const numero = process.env.NUMERO;
        const mensaje = `*Agente*: ${numeroAtencion}`;
        await enviarMensaje(numero, mensaje, null);
    }



