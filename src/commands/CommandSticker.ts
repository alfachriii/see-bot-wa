import { Message, MessageMedia } from "whatsapp-web.js";
import Command from "./Command";
import { client } from "..";
import * as fs from "fs";
import path from "path";
import config from "../config/config.json";
import { delay } from "../functions/functions";

export class CommandSticker extends Command {
  constructor() {
    super("sticker", "it's command sticker", ["stiker"]);
  }

  async execute(msg: Message, args: string[]): Promise<void> {
    if (msg.hasQuotedMsg) {
      const qoutedMsg = await msg.getQuotedMessage();

      msg.reply("_Loading..._");
      const image = await qoutedMsg.downloadMedia();
      client.sendMessage(msg.from, image, {
        sendMediaAsSticker: true,
        stickerAuthor: `${config.botName}'78`,
      });

      return;
    }

    if (!msg.hasMedia) {
      msg.reply(
        "Tolong kirim gambar/video terlebih dahulu!\nContohnya seperti: "
      );
      const imagePath = path.resolve(__dirname, "../media/sticker-test.jpeg");
      const media = MessageMedia.fromFilePath(imagePath);
      setTimeout(() => {
        client.sendMessage(msg.from, media, { caption: "!sticker" });
      }, 500);

      return;
    }

    msg.reply("_Loading..._");
    const image = await msg.downloadMedia();
    client.sendMessage(msg.from, image, {
      sendMediaAsSticker: true,
      stickerAuthor: `${config.botName}'78`,
    });
  }
}

// {
//   users: [
//     {
//       name: string,
//       contactId: string,
//       convertToolsUsed: number,
//     },
//     {
//       name: string,
//       contactId: string,
//       convertToolsUsed: number,
//     },
//     {
//       name: string,
//       contactId: string,
//       convertToolsUsed: number,
//     },
//   ]
// }
