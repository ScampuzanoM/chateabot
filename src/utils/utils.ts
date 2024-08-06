// Importa el módulo axios
import axios from 'axios';

// Importa el módulo dotenv para acceder a las variables de entorno
import dotenv from 'dotenv';

// Configura dotenv para cargar las variables de entorno
dotenv.config();

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';


// Función para enviar un mensaje utilizando el servicio HTTP
export async function enviarMensaje(number: string, message: string, urlMedia?: string | null) {
    const endpoint = `${process.env.BASE_URL}/v1/messages`;
    try {
        const response = await axios.post(endpoint, { number, message, urlMedia });
        console.log('Respuesta del servidor:', response.data);
    } catch (error) {
        console.error('Error al enviar mensaje:', error.response.data);
    }
}


// Define la interfaz para el JSON importado
interface Funados {
    blackList: string[];
  }

  // Obtén la ruta del directorio actual
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Ruta del archivo JSON
  const jsonPath = process.env.FUNADOS_JSON_PATH || resolve(__dirname, '../../funados.json');


  // Función para leer el archivo JSON
  export const readJsonFile = (): Funados => {
    const data = readFileSync(jsonPath, 'utf8');
    return JSON.parse(data);
  };

  // Función para escribir en el archivo JSON
  export const writeJsonFile = (data: Funados): void => {
    writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  };

  // Función para agregar una cadena a la blacklist
  export const addStringToBlacklist = (str: string): void => {
    const jsonData = readJsonFile();
    if (!jsonData.blackList.includes(str)) {
      jsonData.blackList.push(str);
      writeJsonFile(jsonData);
      console.log(`Cadena ${str} agregada a la blacklist.`);
    } else {
      console.log(`La cadena ${str} ya está en la blacklist.`);
    }
  };

  // Función para agregar múltiples cadenas a la blacklist
  export const addStringsToBlacklist = (strings: string[]): void => {
    const jsonData = readJsonFile();
    strings.forEach(str => {
      if (!jsonData.blackList.includes(str) && str !== "") {
        jsonData.blackList.push(str);
      } else if (str === "") {
        console.log("No se puede agregar una cadena vacía a la blacklist.");
      } else {
        console.log(`La cadena ${str} ya está en la blacklist.`);
      }
    });
    writeJsonFile(jsonData);
    console.log(`Cadenas [${strings.join(", ")}] agregadas a la blacklist.`);
  };