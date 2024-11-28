import { Message } from "whatsapp-web.js";
import Command from "./Command";
import { client, shutdown } from "..";
import { isAdmin } from "../functions/isAdmin";
import { delay } from "../functions/functions";

export class CommandShutdown extends Command {
  constructor() {
    super("shutdown", "it's command SHUTDOWN", ["kill"]);
  }

  async execute(msg: Message, args: string[]): Promise<void> {
    try {
      const user = await msg.getContact();
      const userId = user.id._serialized;

      if (isAdmin(userId)) {
        msg.reply("Shutting down bot...");

        console.log(
          `Shutdown command received from ${userId}. Shutting down...`
        );
        await delay(15000);
        client.destroy();
        process.exit(0);
      } else {
        msg.reply("Maaf, perintah ini hanya untuk admin.");
      }
    } catch (error) {
      console.error("Error executing shutdown command:", error);
      msg.reply("Terjadi kesalahan saat memproses perintah shutdown.");
    }
  }
}
