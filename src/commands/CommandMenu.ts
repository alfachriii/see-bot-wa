import { Message, MessageMedia, Contact } from "whatsapp-web.js";
import { client } from "..";
import Command from "./Command";
import axios from "axios";
import path from "path";
import config from "../config/config.json"

export class CommandMenu extends Command {
  constructor() {
    super("menu", "it's command menu", ["help"]);
  }

  async execute(msg: Message, args: string[]): Promise<void> {
    try {
      const user = await msg.getContact();
      const userId: string = user.id._serialized;
      const contact = await client.getContactById(userId);
      const profilePictUrl: string = await contact.getProfilePicUrl();
      const noPhotoPath = path.resolve(__dirname, "../media/no-pp.jpg");
      let media;
      if (!profilePictUrl) {
        media = MessageMedia.fromFilePath(noPhotoPath);
      } else {
        // console.log(profilePictUrl)
        const response = await axios.get(profilePictUrl, {
          responseType: "arraybuffer",
        });
        media = new MessageMedia(
          "image/jpeg",
          response.data.toString("base64")
        );
      }

      client.sendMessage(msg.from, media || "", {
        caption: `*Hello _@${user.pushname}_,*\n*Selamat Datang Di ${config.botName}*\n\n\n*~prefix: [!],[.],[/]*\n\n*Command Khusus Admin:*\n!shutdown\nUntuk Mematikan Bot\n\n*Command Untuk Semua Users:*\n*!say*\nPerintah untuk bot mengirim pesan\nUsage: ketik !say hello\n\n!menutools\nMenampilkan Menu tools tools yang berguna\nUsage: ketik !menutools\n\n*_owner: wa.me/${config.author.contact}_*\n*${config.author.instagram}*`,
      });
    } catch (error) {
      console.error("ERROR saat mengirim gambar: ", error);
    }
  }
}
