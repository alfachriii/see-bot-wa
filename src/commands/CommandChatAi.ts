import { isAdmin } from "../functions/isAdmin";
import { delay } from "../functions/functions";
import config from "../config/config.json";
import { Message } from "whatsapp-web.js";
import { model } from "../lib/geminiAi";
import Command from "./Command";
import fs from "fs";

export class CommandChatAi extends Command {
  constructor() {
    super("chatai", "it's command chat AI", ["ai"]);
  }

  async execute(msg: Message, args: string[]): Promise<void> {
    let _limit = JSON.parse(
      fs.readFileSync(`${config.basePathSrc}database/limit.json`).toString()
    ); // membaca database limit

    if (args.length < 1) {
      msg.reply(
        "Berikan pertanyaan / prompt, contohnya:\n!chatai buatkan saya puisi romantis"
      );
      return;
    } // reply peringatan jika tidak ada args / prompt

    const userId = (await msg.getContact()).id._serialized;
    const user = _limit.find(
      (user: { userId: string }) => user.userId === userId
    );
    const indexUser = Math.floor(user.id - 1);

    if (_limit[indexUser].chatAiUsed >= config.limitAiUsage || !isAdmin(userId)) {
      msg.reply(
        "Kouta untuk penggunaan fitur ini sudah habis, coba lagi besok"
      );
      return;
    } 
    const prompt = args.join(" ");
    
    msg.reply("Loading.. AI lagi mikir...");
    
    const result = await model.generateContent(prompt);
    delay(1000)
    const answerAi = result.response.text()
    msg.reply(`Jawaban dari AI:\n\n${answerAi}`)

    if(isAdmin(userId)) return // skip jika yang chat adalah admin
    await delay(1000)
    _limit[indexUser].chatAiUsed = Math.floor(_limit[indexUser].chatAiUsed + 1);
    fs.writeFileSync(
      `${config.basePathSrc}database/limit.json`,
      JSON.stringify(_limit)
    );
  }
}
