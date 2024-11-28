import { Message } from "whatsapp-web.js";
import Command from "./Command";
import config from "../config/config.json";

const message = () => {
  return `
*── 「 MENU GAMES 」 ──*

1. _!songgame_
Games Menebak Judul Lagu
Usage: Ketik _!songgame_
`;
};

export class CommandMenuGames extends Command {
  constructor() {
    super("menugames", "it's command menu games", ["games"]);
  }

  execute(msg: Message, args: string[]): void {
    msg.reply(message());
  }
}
