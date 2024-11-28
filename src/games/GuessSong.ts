import { Message } from "whatsapp-web.js";
import fs from "fs";
import config from "../config/config.json";
import { sendAudioFromLink } from "../lib/sendAudioFromLink";
import _inGame from "../database/user/inGame.json";
import songs from "../database/games/songs.json";
import { validasiNamaLagu } from "../functions/isAnswerValid";
import { client } from "..";
import { delay } from "../functions/functions";

const welcome = () => {
  return `
*Selamat Datang di game _Guess the Song_*

Disini kalian akan menebak judul dari lagu
yang akan dikirimkan.

Ketik *MULAI*, untuk memulai game.
Ketik *KELUAR*, untuk keluar dari game.
`;
};

class SongGuess {
  activeGames: any = {};
  score: number = 0;

  constructor() {
    this.activeGames = {};
  }

  startGames(msg: Message) {
    msg.reply(welcome());
  }

  async showQuestions(msg: Message) {
    const from = msg.from;
    const attempt = this.activeGames[from].attempt;
    const score = this.activeGames[from].score;
    this.activeGames[from].questionCount++;
    if (attempt === 0 || this.activeGames[from].questionCount === 6) {
      msg.reply(`Games Selesai, Total Score: ${score}🎉🎉\nKetika _!songgame_ untuk main lagi`);
      delete this.activeGames[from];
      return
    }
    const randomNumber = Math.floor(Math.random() * songs.length) + 1;
    this.activeGames[from].indexQuestion = randomNumber;
    const question = songs[randomNumber];
    await delay(1500)
    sendAudioFromLink(question.link, msg);
    await delay(1000);
    client.sendMessage(from, "Lagu apakah ini🤔?");
  }

  processGuess(msg: Message) {
    const from = msg.from;
    const game = this.activeGames[from];
    const answer = msg.body.toLowerCase();
    const question =
      game && game.indexQuestion !== undefined && songs[game.indexQuestion]
        ? songs[game.indexQuestion].name
        : "";

    if (game) {
      if (answer === "mulai") {
        this.showQuestions(msg);
        return;
      }
      if (answer === "lagi") {
        this.showQuestions(msg);
        return;
      }
      if (answer === "keluar") {
        delete this.activeGames[from];
        msg.reply("Keluar dari game..");
        return;
      }
      if (this.activeGames[from].questionCount >= 1) {
        if (validasiNamaLagu(answer, question)) {
          this.activeGames[from].score = this.activeGames[from].score + 20;
          client.sendMessage(
            from,
            `Total Score saat ini: ${this.activeGames[from].score}\nKetik LAGI, untuk mendapatkan soal lagi.`
          );
          client.sendMessage(from, `Selamat Jawaban Anda Benar🎉,\nsong: ${question}`)
          return
        }
        this.activeGames[from].score !== 0
          ? this.activeGames[from].score = this.activeGames[from].score - 15
          : this.activeGames[from].score = 0;
        this.activeGames[from].attempt = this.activeGames[from].attempt - 1;
        client.sendMessage(
          from,
          `Total Score saat ini: ${this.activeGames[from].score}\nSisa Kesempatan Menebak: ${this.activeGames[from].attempt}\nKetik LAGI, untuk mendapatkan soal lagi.\nKetik KELUAR, untuk keluar dari game *jika anda cemss`
        );
        client.sendMessage(from, `Jawaban Anda Salah😭,\nsong: ${question}`)
        return
      }
    }
  }

  handleCommand(msg: Message) {
    if (msg.body.toLowerCase() === "!songgame") {
      const from = msg.from;
      if (!this.activeGames[from]) {
        const randomNumber = Math.floor(Math.random() * 10) + 1; // Angka acak antara 1 dan 10
        this.activeGames[from] = {
          indexQuestion: 0,
          questionCount: 0,
          attempt: 5,
          score: 0,
        };
      }
      this.startGames(msg);
    }
  }
}

export default SongGuess;
