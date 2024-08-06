import { addKeyword, EVENTS } from '@builderbot/bot';
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { addStringToBlacklist, enviarMensaje } from '../utils/utils';
import { numberClean } from './mute.flow';
import { reset, stop } from '../idle-custom'
export const detalFlow = addKeyword<Provider, Database>('detal')
    .addAnswer(
        [
            '*¡Gracias por tu interés en nuestros servicios! 🌟*',
            '',
            'En ChateaBot ofrecemos los siguientes servicios:',
            '',
            '*Desarrollo de chatbots:* Creamos chatbots personalizados que se adaptan a las necesidades de tu negocio, mejorando la atención al cliente y automatizando tareas repetitivas.',
            '',
            '*Desarrollo de páginas web y ecommerce:* Diseñamos y desarrollamos páginas web modernas y funcionales para potenciar tu presencia en línea.',
            '',
            '*Administración de redes sociales y campañas de marketing:* Gestionamos tus redes sociales y creamos campañas de marketing efectivas para aumentar tu alcance y engagement.',
            '',
            'Si deseas más información o quieres agendar una reunión con uno de nuestros ingenieros, responde con:',
            '1️⃣ Agendar reunión',
            '',
            'O escribe "menu" para volver al menú principal.'
        ].join('\n'),
        { delay: 0, capture: false }
    )
    .addAction(async (ctx, { blacklist, flowDynamic}) => {
        const toMute = numberClean(ctx.from);
        console.log("entro")
        await  addStringToBlacklist(toMute);
        blacklist.add(toMute);
        await  ejemploEnviarMensaje(toMute);
        return;
    })


    // Ejemplo de uso de la función enviarMensaje
    async function ejemploEnviarMensaje(numeroAtencion) {
        const numero = process.env.NUMERO;
        const mensaje = `*Agente*: ${numeroAtencion}`;
        await enviarMensaje(numero, mensaje, null);
    }



