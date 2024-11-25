import { Message, MessageMedia } from "whatsapp-web.js";
import Command from "./Command";
import axios from "axios";
import { client } from "..";
import { get } from "https";

// async function downloadImage(url: string): Promise<Buffer> {
//     return new Promise((resolve, reject) => {
//         get(url, (res) => {
//             const chunks: Uint8Array[] = [];

//             res.on('data', (chunk) => chunks.push(chunk));
//             res.on('end', () => resolve(Buffer.concat(chunks)));
//             res.on('error', (err) => reject(err));
//         }).on('error', (err) => reject(err));
//     });
// }

export class CommandTesting extends Command {
  constructor() {
    super("testing", "it's command testing", ["test"]);
  }

  async execute(msg: Message, args: string[]): Promise<void> {
    try {
      console.log("Memulai unduhan gambar...");

      // Unduh gambar dari URL
      const response = await axios.get(
        "https://drive.google.com/uc?id=1RBVylzlzAxD48gYqVg57oq2QTysQo8ZN",
        { responseType: "arraybuffer" }
      );

      console.log("Gambar berhasil diunduh.");

      // Konversi ke buffer
      const mediaBuffer = Buffer.from(response.data, "base64");

      // Buat media
      const media = new MessageMedia(
        "image/jpeg", // MIME type
        mediaBuffer.toString("base64")
      );

      console.log("Media berhasil dibuat. Mengirim pesan...");
      console.log("Media Base64 Length:", media.data.length);

      // Kirim pesan
      client.sendMessage(msg.from, media, { caption: "Test" });

      console.log("Pesan berhasil dikirim!");
    } catch (error) {
      console.error("Error saat mengirim gambar:", error);
    }
  }
}
