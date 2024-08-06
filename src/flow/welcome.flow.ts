import { addKeyword, EVENTS } from '@builderbot/bot';
import { MemoryDB as Database } from '@builderbot/bot';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys';
import { mayoristaFlow } from './mayorista.flow';
import { reset, start } from '../idle-custom';

import { detalFlow } from './detal.flow';
import { personalizadoFlow } from './personalizado.flow';

export const welcomeFlow = addKeyword<Provider, Database>(['hola', 'hoola', 'ole', 'alo', 'buenas', 'menu', 'holi', 'hol', 'oe', 'buenos','buen','hello','hi','buenas','Buenas tardes','Hola'])
    .addAnswer(
        [
            '*¡Hola! Bienvenido a ChateaBot 🗨️*',
            '',
            'Soy *Chateabot*, tu asistente virtual. Estoy aquí para ayudarte a mejorar la atención al cliente con nuestros flujos conversacionales para WhatsApp 📲.',
            '',
            '*Menú de opciones:*',
            '1️⃣ Información sobre nuestros servicios',
            '2️⃣ Soporte técnico',
            '3️⃣ Contactar a un representante',
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
