import { Message } from "whatsapp-web.js";
import Command from "./Command";
import SongGuess from "../games/GuessSong";

export class CommandSongGuess extends Command{
    constructor() {
        super("songguess", "it's command song guess games", ["tebaklagu"])
    }

    execute(msg: Message, args: string[]): void {
    }
}