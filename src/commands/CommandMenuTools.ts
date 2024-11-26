import { Message } from "whatsapp-web.js";
import Command from "./Command";
import config from "../config/config.json"

const message = () => {
  return `
*Menu Tools ${config.botName}:*
1. _!stikcer_
Untuk membuat sticker
Usage: Kirim gambar dengan caption _!sticker_

2. _!chatai_
Untuk tanya AI
Usage: Kirim _!chatai_ <Prompt / Pertanyaan>

2. _!tomp3_
Untuk mengubah ke mp3
Usage: Kirim video dengan caption _!tomp3_

3. _!tomp4_
Untuk mengubah format video ke mp4
Usage: Kirim video dengan caption _!tomp4_
    `;
};

export class CommandMenuTools extends Command {
  constructor() {
    super("menutools", "it's command menutools", ["tools"]);
  }

  execute(msg: Message, args: string[]): void {
    msg.reply(message());
  }
}

// "*Menu Tools dari seeBot:*\n\n*1. _!sticker_*\nUntuk membuat sticker\nUsage: kirim gambar/video dengan caption !sticker\n"
