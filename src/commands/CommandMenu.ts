import { Message, MessageMedia, Contact } from "whatsapp-web.js";
import { client } from "..";
import Command from "./Command";
import axios from "axios";

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
      const response = await axios.get(profilePictUrl, {
        responseType: "arraybuffer",
      });
      const media = new MessageMedia(
        "image/jpeg",
        response.data.toString("base64")
      );

      client.sendMessage(msg.from, media, {
        caption: `*Hello _@${user.pushname}_,*\n*Selamat Datang Di BoyBoT*\n\n\n*~prefix: [!],[.],[/]*\n\n*!say*\nPerintah untuk bot mengirim pesan\nUsage: ketik !say hello\n\n!menutools\nMenampilkan Menu tools tools yang berguna\nUsage: ketik !menutools\n\n*_owner: wa.me/6282313116359_*`,
      });
    } catch (error) {
      console.error("ERROR saat mengirim gambar: ", error);
    }
  }
}
