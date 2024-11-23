import { Message } from "whatsapp-web.js";

abstract class Command {
  prefixs: string[] = [".", "!", "/"]
  name: string;
  description: string
  alias: string[]

  constructor(name: string, description: string, alias: string[]) {
    this.name = name;
    this.description = description || "";
    this.alias = alias ? [name, ...alias] : [name]
  }

  abstract execute (msg: Message, args: string[]): void;

  handle(msg: Message) {
    const prefix = msg.body[0];
    const argAll: string[] = msg.body.slice(1).split(" ");
    if(this.prefixs.includes(prefix)) {
        const cmdNoprefix = argAll[0].toLocaleLowerCase()
        if(this.alias.includes(cmdNoprefix)) {
            const args = argAll.slice(1)
            this.execute(msg, args)
        }
     }
  }
}

export default Command
