import Command from "./commands/Command";
import { CommandMenu } from "./commands/CommandMenu";
import { CommandMenuTools } from "./commands/CommandMenuTools"
import { CommandSay } from "./commands/CommandSay";
import { CommandShutdown } from "./commands/CommandShutdown";
import { CommandSticker } from "./commands/CommandSticker";

const commands: Command[] = [
    new CommandMenu(),
    new CommandMenuTools(),
    new CommandSay(),
    new CommandSticker(),
    new CommandShutdown()
]

export default commands