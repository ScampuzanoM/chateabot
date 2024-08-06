
import { createFlow } from '@builderbot/bot';
import { mayoristaFlow } from './mayorista.flow';

import { welcomeFlow } from "./welcome.flow";
import {defaulFlow} from "./default.flow"
import {mediaFlow} from "./media.flow"
import {blackListFlow} from './mute.flow'
import { idleFlow } from '../idle-custom'
import { detalFlow } from './detal.flow';
import {voiceNoteFlow} from './voce.flow'
import * as dotenv from 'dotenv';
import { personalizadoFlow } from './personalizado.flow';
dotenv.config();

export const flow = createFlow([welcomeFlow, mayoristaFlow, idleFlow,blackListFlow,detalFlow,personalizadoFlow,defaulFlow,mediaFlow,voiceNoteFlow])