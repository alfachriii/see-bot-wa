import { Message, MessageMedia } from "whatsapp-web.js";
import Command from "./Command";
import axios from "axios";
import { client } from "..";
import { get } from "https";
import { delay } from "../functions/functions";
import { error } from "console";
import { sendAudioFromLink } from "../lib/sendAudioFromLink";

export class CommandTesting extends Command {
  constructor() {
    super("testing", "it's command testing", ["test"]);
  }

  async execute(msg: Message, args: string[]): Promise<void> {
    const myChat = await client.sendMessage(msg.from, "send")
    for(let i = 0; i < 3; i++){
      myChat.edit("loading")
      await delay(400)
      myChat.edit("loading.")
      await delay(400)
      myChat.edit("loading..")
      await delay(400)
      myChat.edit("loading...")
      await delay(400)
      myChat.edit("loading....")
      await delay(400)
      myChat.edit("loading...")
      await delay(400)
      myChat.edit("loading..")
      await delay(400)
      myChat.edit("loading.")
      await delay(400)
    }
  }
}
