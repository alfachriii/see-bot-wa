import commands from "./commands";
import SongGuess from "./games/GuessSong"

class Messages {
  songGuess: SongGuess;
  constructor() {
    this.songGuess = new SongGuess()
  }

  handleMessage(msg: any) {
    this.songGuess.handleCommand(msg)
    this.songGuess.processGuess(msg)

    this.handleCommandMessage(msg);

  }

  handleCommandMessage(msg: any) {
    for (const command of commands) {
      command.handle(msg);
    }
  }
}

export default Messages
