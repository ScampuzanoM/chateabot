import { addKeyword, EVENTS } from '@builderbot/bot';
import { reset, start } from '../idle-custom';

import { serviciosFlow } from './servicios.flow';

export const welcomeFlow = addKeyword([EVENTS.WELCOME,EVENTS.VOICE_NOTE,'menu'])
.addAnswer(
    [
        '*¡Hola! Bienvenido a ChateaBot 🗨️*',
        '',
        'Soy *Chateabot*, tu asistente virtual. Estoy aquí para ayudarte a mejorar la atención al cliente con nuestros flujos conversacionales para WhatsApp 📲.',
        '',
        '*Menú de opciones:*',
        '1️⃣ Información sobre nuestros servicios',
        '',
        'Nuestro horario de atención es de lunes a viernes de 7:30 a.m. a 4:30 p.m. y los sábados de 7:30 a.m. a 12:00 p.m.',
        '',
        '*Responde con el número de tu opción.*'
    ].join('\n'),
    {capture: true},
    async (ctx, { gotoFlow, fallBack}) => {
            start(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            const opcion = ctx.body
            switch (opcion) {
                case '1': {
                    return gotoFlow(serviciosFlow)
                }
                default: {
                   return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟..')
                }
            }
        },
    []
)


