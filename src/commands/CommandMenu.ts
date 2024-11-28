import { Message, MessageMedia, Contact } from "whatsapp-web.js";
import { client } from "..";
import Command from "./Command";
import axios from "axios";
import path from "path";
import config from "../config/config.json"

const message = (userName: string, botName: string, contact: string, instagram: string) => {return `
Hello *@${userName}*,
*Selamat Datang di _${botName}_*

Daftar prefix: (!),(.),(/)

Commnd khusus Admin:
!shutdown
Untuk mematikan Bot

Command Untuk Semua Users:
_!menutools_
Untuk Menampilkan Menu tools
Usage: Ketik _!menutools_

_!menugames_
Untuk Menampilkan Menu Games
Usage: Ketik _!menugames_


_owner: wa.me/${contact}_
${instagram}
`}

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
        caption: message(user.pushname, config.botName, config.author.contact, config.author.instagram),
      });
    } catch (error) {
      console.error("ERROR saat mengirim gambar: ", error);
    }
  }
}
