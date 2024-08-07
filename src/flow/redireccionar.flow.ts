import { addKeyword } from '@builderbot/bot';
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { reset, stop } from '../idle-custom'


export const redireccionarFlow = addKeyword<Provider, Database>(['mensajeredireccionar'])
    .addAnswer(
        [
            '¡Seras dirigido con un asesor que te apoyara con tu ! 🌟',

        ], null, async (ctx, { flowDynamic , state }) => {
            // stop(ctx);

            console.log(state.get('tel_asesor'));
            console.log("entro")
            const TEL = state.get('tel_asesor');
            const mensaje = state.get('mensaje_asesor');
            // const mensaje = `Hola, estoy interesado en termos redireccionars `;

            // Codificar el mensaje para usarlo en el enlace de WhatsApp
            const enlaceWhatsApp = encodeURI(`https://wa.me/${TEL}?text=${mensaje}`);

            // Mensaje final que se enviará a través de tu flujo dinámico
            const mensajeFinal = `*Haz clic en el siguiente enlace:*
          ${enlaceWhatsApp}`;

            // Enviar el mensaje utilizando tu función flowDynamic
            stop(ctx);
            return await flowDynamic(mensajeFinal);
        }
    )


