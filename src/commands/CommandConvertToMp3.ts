import { Message, MessageMedia } from "whatsapp-web.js";
import Command from "./Command";
import path from "path";
import * as fs from "fs";
import { client } from "..";

export class CommandConvertToMp3 extends Command {
  constructor() {
    super("mp4tomp3", "it's command convert mp4 to mp3", ["tomp3"]);
  }

  async execute(msg: Message, args: string[]): Promise<void> {
    if (!msg.hasMedia) {
      msg.reply(
        "Tolong Masukkan / kirim video yang ingin diconvert!\nContohnya seperti: "
      );

      const media = await MessageMedia.fromUrl("https://drive.google.com/uc?export=download&id=1_0vsVMtIlA7KG59Tbgk-LSY2zH0vUXyt", { unsafeMime: true });
      client.sendMessage(msg.from, media, { caption: "!mp4tomp3" });
    //   console.log('Video berhasil dikirim!');
      console.log(media);
    } else {
      console.log("gut");
    }
  }
}
