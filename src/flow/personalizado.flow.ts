import { addKeyword } from '@builderbot/bot';
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { reset, stop } from '../idle-custom'


export const personalizadoFlow = addKeyword<Provider, Database>(['personalizado'])
    .addAnswer(
        [
            '¡Seras dirigido con un asesor que te apoyara con tu personalizado! 🌟',

        ], null, async (ctx, { flowDynamic }) => {
            stop(ctx);

            const TEL = process.env.PERSONALIZADO


            const mensaje = `Hola, estoy interesado en termos personalizados `;

            // Codificar el mensaje para usarlo en el enlace de WhatsApp
            const enlaceWhatsApp = encodeURI(`https://wa.me/${TEL}?text=${mensaje}`);

            // Mensaje final que se enviará a través de tu flujo dinámico
            const mensajeFinal = `*Haz clic en el siguiente enlace:*
          ${enlaceWhatsApp}`;

            // Enviar el mensaje utilizando tu función flowDynamic
            return await flowDynamic(mensajeFinal);

        }
    )


