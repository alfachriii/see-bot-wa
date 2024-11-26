import Command from "./commands/Command";
import { CommandMenu } from "./commands/CommandMenu";
import { CommandMenuTools } from "./commands/CommandMenuTools";
import { CommandSay } from "./commands/CommandSay";
import { CommandShutdown } from "./commands/CommandShutdown";
import { CommandSticker } from "./commands/CommandSticker";
import { CommandConvertToMp3 } from "./commands/tools/CommandConvertToMp3";
import { CommandTesting } from "./commands/CommandTesting";

const commands: Command[] = [
  new CommandMenu(),
  new CommandMenuTools(),
  new CommandSay(),
  new CommandSticker(),
  new CommandShutdown(),
  new CommandConvertToMp3(),
  new CommandTesting(),
];

export default commands;
