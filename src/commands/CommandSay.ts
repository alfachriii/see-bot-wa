import { Message } from "whatsapp-web.js";
import Command from "./Command";

export class CommandSay extends Command{
    constructor() {
        super("say", "it's command say", ["ngomong"])
    }

    execute(msg: Message, args: string[]): void {
        if(args.length < 1) {
            msg.reply("Tolong masukkan kata terlebih dahulu seperti,\n!say halo")
            return
        }
        msg.reply(args.join(" "))
    }
}