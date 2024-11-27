import { Message, MessageMedia } from "whatsapp-web.js";
import Command from "./Command";
import axios from "axios";
import { client } from "..";
import { get } from "https";

// async function downloadImage(url: string): Promise<Buffer> {
//     return new Promise((resolve, reject) => {
//         get(url, (res) => {
//             const chunks: Uint8Array[] = [];

//             res.on('data', (chunk) => chunks.push(chunk));
//             res.on('end', () => resolve(Buffer.concat(chunks)));
//             res.on('error', (err) => reject(err));
//         }).on('error', (err) => reject(err));
//     });
// }

export class CommandTesting extends Command {
  constructor() {
    super("testing", "it's command testing", ["test"]);
  }

  async execute(msg: Message, args: string[]): Promise<void> {
  }
}
