import { Message, MessageMedia } from "whatsapp-web.js";
import { downloadFile } from "../lib/downloadFile";
import { deleteFile } from "../lib/deleteFileTemp";
import { downloadIg } from "../lib/IGDownloader";
import { delay } from "../functions/functions";
import config from "../config/config.json";
import Command from "./Command";
import { client } from "..";

export class CommandIgDown extends Command {
  constructor() {
    super("ig", "it's command ig downloader", ["igdownload"]);
  }

  async execute(msg: Message, args: string[]): Promise<void> {
    if (args.length < 1) {
      msg.reply(
        "Masukkan Link IG! contohnya:\n_!igdown www.instagram.com/alsseeeee_"
      );
      return;
    }

    msg.reply("Loading...");
    msg.reply("Mungkin ini membutuhkan waktu beberapa saat..");

    const link = args[0];

    await downloadIg(link)
      .then(async (result) => {
        console.log(
          `Download ig content request from ${
            (await msg.getContact()).id._serialized
          }`
        );

        const downloadUrl = result.downloadLink;

        if (downloadUrl.length === 1) {
          const typeFile = result.typeFile;
          const outputPath = `${config.basePathTemp}${
            msg.from
          }_${Date.now()}.${typeFile}`;

          downloadFile(downloadUrl.toString(), outputPath);
          await delay(5000);
          const downloadedFile = MessageMedia.fromFilePath(outputPath);
          await delay(780);
          client.sendMessage(msg.from, downloadedFile);
          await delay(1500);
          deleteFile(outputPath);
          console.log("Download content IG success");
          return;
        }

        if (Array.isArray(downloadUrl)) {
          downloadUrl.forEach(async (url) => {
            const downloadUrl = url.split("&&&")[0];
            const typeFile = url.split("&&&")[1];
            const outputPath = `${config.basePathTemp}${
              msg.from
            }_${Date.now()}.${typeFile}`;
            downloadFile(downloadUrl, outputPath);
            await delay(3870);
            const downloadedFile = MessageMedia.fromFilePath(outputPath);
            await delay(780);
            client.sendMessage(msg.from, downloadedFile);
            await delay(3000);
            deleteFile(outputPath);
          });
          console.log("Download content IG success");
        }
        return;
      })
      .catch((error) => {
        console.error("ERORR while get download url: ", error);
        msg.reply("error saat mendownload konten..");
      });
  }
}
