import { ChatId, Message } from "whatsapp-web.js";
import Command from "./Command";
import { client } from "..";

export class CommandClear extends Command{
    constructor() {
        super("clear", "it's command for clear all chat", ["hapus"])
    }

    async execute(msg: Message, args: string[]): Promise<void> {
        console.log(msg.from)
        const chatId = msg.from
        const chats = await client.getChatById(chatId)
        
        await chats.clearMessages()
        client.sendMessage(msg.from, "Berhasil Menghapus Chats")
    }
}