import { Message, MessageMedia } from "whatsapp-web.js";
import { convertVideo } from "../../lib/convertVideo";
import { deleteFile } from "../../lib/deleteFileTemp";
import { delay } from "../../functions/functions";
import Command from "../Command";
import config from "../../config/config.json";
import * as fs from "fs";
import { client } from "../..";

export class CommandConvertToMp4 extends Command {
  constructor() {
    super("tomp4", "it's command convert video to mp4", ["tomp4"]);
  }

  async execute(msg: Message, args: string[]): Promise<void> {
    if (!msg.hasMedia) {
      msg.reply("Tolong Masukkan / kirim video yang ingin diconvert!");
      return;
    }
    const media = await msg.downloadMedia();
    const mimetype = media.mimetype;
    const mediaType = mimetype.split("/")[0];
    const filesize = media.filesize || 700000;
    if (mediaType === "video") {
      msg.reply("Loading...");
      const fileName = `${msg.from}_${Date.now()}.${mimetype.split("/")[1]}`;
      const pathFile = `${config.basePathTemp}${fileName}`;
      fs.writeFileSync(pathFile, media.data, "base64");
      const outputFilePath = convertVideo(pathFile, fileName, "mp4");
      await delay(Math.floor(filesize / 600));
      const convertedVideo = MessageMedia.fromFilePath(outputFilePath);
      await delay(780);
      client.sendMessage(msg.from, convertedVideo, {
        sendMediaAsDocument: true,
      });
      await delay(1500);
      deleteFile(pathFile);
      deleteFile(outputFilePath);
      return;
    }
    msg.reply("Yang anda kirim bukan video,");
  }
}
