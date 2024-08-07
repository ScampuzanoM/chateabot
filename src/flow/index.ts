
import { createFlow } from '@builderbot/bot';
import { soporteFlow } from './soporte.flow';

import { welcomeFlow } from "./welcome.flow"
import {blackListFlow} from './mute.flow'
import { idleFlow } from '../idle-custom'
import { serviciosFlow } from './servicios.flow';
import * as dotenv from 'dotenv';
import { redireccionarFlow } from './redireccionar.flow';

dotenv.config();

export const flow = createFlow([ redireccionarFlow, soporteFlow, idleFlow,blackListFlow,serviciosFlow,welcomeFlow])