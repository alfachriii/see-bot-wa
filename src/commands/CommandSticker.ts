import { Message, MessageMedia } from "whatsapp-web.js";
import Command from "./Command";
import { client } from "..";
import * as fs from "fs";
import path from "path";

export class CommandSticker extends Command {
  constructor() {
    super("sticker", "it's command sticker", ["stiker"]);
  }

  async execute(msg: Message, args: string[]): Promise<void> {
    if (!msg.hasMedia || (args[0].toLocaleLowerCase() === "help")) {
      msg.reply(
        "Tolong Masukkan / kirim gambarnya terlebih dahulu!\nContohnya seperti: "
      );
      const imagePath = path.resolve(__dirname, "../sticker-test.jpeg");
      const media = MessageMedia.fromFilePath(imagePath);
      client.sendMessage(msg.from, media, { caption: "!sticker" });
      console.log(args[0]);
    } else {
      const image = await msg.downloadMedia();
      client.sendMessage(msg.from, image, {
        sendMediaAsSticker: true,
        stickerAuthor: "seeBot'78",
      });
    }
  }
}
