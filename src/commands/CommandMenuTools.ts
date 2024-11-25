import { Message } from "whatsapp-web.js";
import Command from "./Command";

export class CommandMenuTools extends Command{
    constructor() {
        super("menutools", "it's command menutools", ["tools"])
    }

    execute(msg: Message, args: string[]): void {
        msg.reply("*Menu Tools dari seeBot:*\n\n*1. _!sticker_*\nUntuk membuat sticker\nUsage: kirim gambar/video dengan caption !sticker\n")
    }
}