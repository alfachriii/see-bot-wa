import { Message, MessageMedia } from "whatsapp-web.js";
import { downloadFile } from "../lib/downloadFile";
import { deleteFile } from "../lib/deleteFileTemp";
import { delay } from "../functions/functions";
import config from "../config/config.json";
import Command from "./Command";
import { client } from "..";
import { downloadTiktok } from "../lib/tiktokDownloader";

export class CommandTiktokDown extends Command {
  constructor() {
    super("tiktok", "it's command tiktok downloader", ["tt"]);
  }

  async execute(msg: Message, args: string[]): Promise<void> {
    if (args.length < 1) {
      msg.reply(
        "Masukkan Link Tiktok! contohnya:\n_!igdown www.tiktok.com/alsseeeee_"
      );
      return;
    }

    msg.reply("Loading...");
    msg.reply("Mungkin ini membutuhkan waktu beberapa saat..");

    const link = args[0];
    await downloadTiktok(link)
      .then(async (result) => {
        console.log(
          `Download tiktok content request from ${
            (await msg.getContact()).id._serialized
          }`
        );
        const downloadUrl = result.downloadLink;
        const typeFile = result.typeFile;

        if (downloadUrl.length === 1) {
          const outputPath = `${config.basePathTemp}${
            msg.from
          }_${Date.now()}.${typeFile}`;
          downloadFile(downloadUrl.toString(), outputPath);
          await delay(3870);
          const downloadedFile = MessageMedia.fromFilePath(outputPath);
          await delay(780);
          client.sendMessage(msg.from, downloadedFile);
          await delay(3000);
          deleteFile(outputPath);
          console.log("Download content tiktok success");
          return;
        }

        if (Array.isArray(downloadUrl)) {
          downloadUrl.forEach(async (url) => {
            const outputPath = `${config.basePathTemp}${
              msg.from
            }_${Date.now()}.${typeFile}`;
            downloadFile(url, outputPath);
            await delay(3870);
            const downloadedFile = MessageMedia.fromFilePath(outputPath);
            await delay(780);
            client.sendMessage(msg.from, downloadedFile);
            await delay(3000);
            deleteFile(outputPath);
          });
          console.log("Download content tiktok success");
        }
        return;
      })
      .catch((error) => {
        console.error("ERORR while get download url: ", error);
        msg.reply("error saat mendownload konten..");
      });
  }
}
