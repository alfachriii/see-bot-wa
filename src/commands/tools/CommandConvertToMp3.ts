import { Message, MessageMedia } from "whatsapp-web.js";
import { convertVideo } from "../../lib/convertVideo";
import { deleteFile } from "../../lib/deleteFileTemp";
import { delay } from "../../functions/functions";
import Command from "../Command";
import config from "../../config/config.json";
import * as fs from "fs";
import { client } from "../..";

export class CommandConvertToMp3 extends Command {
  constructor() {
    super("tomp3", "it's command convert video to mp3", ["tomp3"]);
  }

  async execute(msg: Message, args: string[]): Promise<void> {
    let media;

    
    if (msg.hasQuotedMsg) {
      const quotedMsg = await msg.getQuotedMessage();
      
      media = await quotedMsg.downloadMedia();
    } else if(!msg.hasMedia) {
      msg.reply("Tolong Masukkan / kirim video yang ingin diconvert!");

      return;
    } else {
      media = await msg.downloadMedia();
    }

    const mimetype = media?.mimetype;
    const mediaType = mimetype?.split("/")[0];
    const filesize = media?.filesize || 700000;

    if (mediaType === "video") {
      msg.reply("Loading...");
      const fileName = `${msg.from}_${Date.now()}.${mimetype.split("/")[1]}`;
      const pathFile = `${config.basePathTemp}${fileName}`;
      fs.writeFileSync(pathFile, media.data, "base64");
      const outputFilePath = convertVideo(pathFile, fileName, "mp3");
      await delay(Math.floor(filesize / 900));
      const convertedVideo = MessageMedia.fromFilePath(outputFilePath);
      await delay(780);
      if (args[0] === "doc") {
        client.sendMessage(msg.from, convertedVideo, {
          sendMediaAsDocument: true,
        });
      } else {
        client.sendMessage(msg.from, convertedVideo);
        client.sendMessage(
          msg.from,
          "Anda Bisa Gunakan argumen tambahan seperti:\n*_!tomp3 doc_*\nAgar hasil convert dikirim dalam bentuk dokumen"
        );
      }
      await delay(1500);
      deleteFile(pathFile);
      deleteFile(outputFilePath);
      return;
    }
    msg.reply("Yang anda kirim bukan video,");
  }
}
