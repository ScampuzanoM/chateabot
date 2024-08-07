import { addKeyword, EVENTS } from '@builderbot/bot';
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { addStringToBlacklist, enviarMensaje } from '../utils/utils';
import { numberClean } from './mute.flow';
import { reset } from '../idle-custom'
import { welcomeFlow } from './welcome.flow';
export const serviciosFlow = addKeyword<Provider, Database>('servicios')
.addAnswer(
    [
        '*¡Gracias por tu interés en nuestros servicios! 🌟*',
        '',
        'En ChateaBot ofrecemos los siguientes servicios:',
        '',
        '🤖 *Desarrollo de chatbots:* Chatbots personalizados para mejorar la atención al cliente y automatizar tareas.',
        '',
        '🌐 *Desarrollo de páginas web y ecommerce:* Páginas web modernas y funcionales para potenciar tu presencia en línea.',
        '',
        '📈 *Administración de redes sociales y marketing:* Gestionamos redes sociales y creamos campañas efectivas.',
    ]
)
.addAnswer(
    [
        '📸 *Síguenos en Instagram:* ¡Mantente al día con nuestras novedades y proyectos!',
            '[Instagram: @chateabot](https://www.instagram.com/chateabot/)',
    ]
)
    .addAnswer(
        [
            'Para más información o agendar una reunión, responde con:',
            '1️⃣ Agendar reunión',
            '2️⃣ Regresar al menú',
            ''
        ]
        
            .join('\n'),
        { delay: 0, capture: true },
        async (ctx, { gotoFlow, fallBack }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            const opcion = ctx.body
            switch (opcion) {
                case '1': {
                    return gotoFlow(serviciosFlow)
                }
                case '2': {
                    return gotoFlow(welcomeFlow)
                }
                default: {
                    return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟..')
                }
            }
        })
    .addAnswer(
        [
            '¿Cual es tu nombre? 🌟',
        ].join('\n'),
        { delay: 0, capture: true },
        async (ctx, { state, gotoFlow }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            await state.update({ nombrecliente: ctx.body })
            return null;
        },
    )
    .addAnswer(
        [
            '¿En que servicio estas interesado, dejanoslo en un solo mensaje por favor? 🌟',
        ].join('\n'),
        { delay: 0, capture: true },
        async (ctx, { state, gotoFlow }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            await state.update({ mensajecliente: ctx.body })
            return null;
        },
    )
    .addAction(async (ctx, { blacklist, flowDynamic, state }) => {

        stop(ctx);
        const myState = state.getMyState();
        const mensaje = `Hola, mi nombre es ${myState.nombrecliente} y estoy interesad@ en ${myState.mensajecliente} y mi numero es ${ctx.from}`;
        // await  addStringToBlacklist(toMute);
        // blacklist.add(toMute);
        await ejemploEnviarMensaje(mensaje);
        return;
    })


// Ejemplo de uso de la función enviarMensaje
async function ejemploEnviarMensaje(numeroAtencion) {
    const numero = process.env.NUMERO;
    const mensaje = `*Agente*: ${numeroAtencion}`;
    await enviarMensaje(numero, mensaje, null);
}



