import Command from "./commands/Command";
import { CommandMenu } from "./commands/CommandMenu";
import { CommandMenuTools } from "./commands/CommandMenuTools";
import { CommandSay } from "./commands/CommandSay";
import { CommandChatAi } from "./commands/CommandChatAi"
import { CommandShutdown } from "./commands/CommandShutdown";
import { CommandSticker } from "./commands/CommandSticker";
import { CommandConvertToMp3 } from "./commands/tools/CommandConvertToMp3";
import { CommandConvertToMp4 } from "./commands/tools/CommandConvertToMp4";
import { CommandClear } from "./commands/CommandClear"
import { CommandTesting } from "./commands/CommandTesting";
import { CommandIgDown } from "./commands/CommandIgDown";
import { CommandTiktokDown } from "./commands/CommandTiktokDown"
import { CommandMenuGames } from "./commands/CommandMenuGames"

const commands: Command[] = [
  new CommandMenu(),
  new CommandMenuTools(),
  new CommandMenuGames(),
  new CommandShutdown(),
  new CommandClear(),
  new CommandSay(),
  new CommandChatAi(),
  new CommandSticker(),
  new CommandIgDown(),
  new CommandTiktokDown(),
  new CommandConvertToMp3(),
  new CommandConvertToMp4(),
  new CommandTesting(),
];

export default commands;
