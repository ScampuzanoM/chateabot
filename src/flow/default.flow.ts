import { addKeyword, EVENTS } from '@builderbot/bot';
import { MemoryDB as Database } from '@builderbot/bot';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys';
import { mayoristaFlow } from './mayorista.flow';
import { reset, start } from '../idle-custom';

import { detalFlow } from './detal.flow';
import { personalizadoFlow } from './personalizado.flow';

export const defaulFlow = addKeyword(EVENTS.WELCOME)
.addAnswer(
    [
        '*¡Hola! Bienvenido a la Fábrica de los Termos🏭*',
        '',
        'Soy Elizabeth👤, tu asistente virtual. Estoy aquí para ayudarte a encontrar los mejores termos de Colombia 🇨🇴.',
        '',
        '*Menú de opciones:*',
        '1️⃣ Venta al Detal',
        '2️⃣ Venta Mayorista',
        '3️⃣ Venta Personalizado',
        '',
        'Nuestro horario de atención es de lunes a viernes de 7:30 a.m. a 4:30 p.m. y los sábados de 7:30 a.m. a 12:00 p.m.',
        '',
        '*Responde con el número de tu opción.*'
    ].join('\n'),
    {capture: true},
    async (ctx, { gotoFlow, fallBack}) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            const opcion = ctx.body
            switch (opcion) {
                case '1': {
                    return gotoFlow(detalFlow)
                }
                case '2': {
                    return gotoFlow(mayoristaFlow)
                }
                case '3': {
                    return gotoFlow(personalizadoFlow)
                }


                default: {
                   return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟..')
                }
            }
        },
    []
)


