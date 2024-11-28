import { Message, MessageMedia } from "whatsapp-web.js";
import Command from "./Command";
import axios from "axios";
import { client } from "..";
import { get } from "https";
import { delay } from "../functions/functions";
import { error } from "console";
import { sendAudioFromLink } from "../lib/sendAudioFromLink";

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
    sendAudioFromLink("https://cdn-preview-b.dzcdn.net/stream/c-b9f23e8520b5b8b09a7f6b5f849f43fa-1.mp3", msg);
  }
}
