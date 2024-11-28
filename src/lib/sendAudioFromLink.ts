import axios from "axios";
import fs from "fs";
import { delay } from "../functions/functions";
import config from "../config/config.json";
import { Message, MessageMedia } from "whatsapp-web.js";
import { client } from "..";

export const sendAudioFromLink = async (url: string, msg: Message) => {
  axios({
    method: "get",
    url: url,
    responseType: "stream",
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
  })
    .then((response) => {
      const filePath = `${config.basePathTemp}${msg.from}_${Date.now()}.mp3`;
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      writer.on("finish", () => {
        // Setelah file audio selesai diunduh, kirimkan ke WhatsApp
        const media = MessageMedia.fromFilePath(filePath);
        client
          .sendMessage(msg.from, media)
          .then(async () => {
            await delay(3000)
            fs.unlinkSync(filePath); // Hapus file setelah dikirim
          })
          .catch((error) => {
            console.error("Error sending audio:", error);
            msg.reply("ERROR while sending audio..")
          });
      });

      writer.on("error", (err) => {
        console.error("Error downloading audio:", err);
      });
    })
    .catch((error) => {
      console.error("Error downloading audio:", error);
    });
};

