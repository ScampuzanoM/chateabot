import { addKeyword, EVENTS } from '@builderbot/bot';
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { addStringToBlacklist, enviarMensaje } from '../utils/utils';
import { numberClean } from './mute.flow';
import { reset, stop } from '../idle-custom'
import { redireccionarFlow } from './redireccionar.flow'

export const soporteErrorAppFlow = addKeyword<Provider, Database>('soporteErrorApp')
    .addAnswer('Regalame tu nombre porfavor', { capture: true },
        async (ctx, { flowDynamic , state}) => {
            await state.update({ nombre_cliente: ctx.body })
            await flowDynamic([`nice! ${ctx.body}`, 'I will send you a funny image'])
        })



