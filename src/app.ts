import { join } from 'path'
import { createBot, createProvider, createFlow, addKeyword, utils } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { flow } from "./flow";
import { fileURLToPath } from 'url';

import * as fs from 'fs';
import * as path from 'path';
import { dirname, resolve } from 'path';
import { readJsonFile } from './utils/utils';





const PORT = process.env.PORT ?? 3007

const jsonData = readJsonFile();

export const main = async () => {



       const adapterProvider = createProvider(Provider, { writeMyself:'host'})

    const adapterDB = new Database()

    const { handleCtx, httpServer } = await createBot({
        flow: flow,
        provider: adapterProvider,
        database: adapterDB,
    },{
       blackList : jsonData.blackList,
    })

    adapterProvider.server.post(
        '/v1/messages',
        handleCtx(async (bot, req, res) => {
            const { number, message, urlMedia } = req.body
            await bot.sendMessage(number, message, { media: urlMedia ?? null })
            return res.end('sended')
        })
    )

    adapterProvider.server.post(
        '/v1/register',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('REGISTER_FLOW', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/samples',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('SAMPLES', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/blacklist',
        handleCtx(async (bot, req, res) => {
            const { number, intent } = req.body

             const lista = bot.blacklist.getList();
            res.writeHead(200, { 'Content-Type': 'application/json' })

            return res.end(JSON.stringify({ status: 'ok', number, intent,lista}))
        })
    )

    httpServer(+PORT)
}

main()