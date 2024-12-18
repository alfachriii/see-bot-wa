import { Client, LocalAuth } from "whatsapp-web.js";
import * as fs from "fs"
import qrcode from "qrcode-terminal";
import commands from "./commands";
import config from "./config/config.json"
import { console } from "inspector";
import Messages from "./Messages"

let _limit = JSON.parse(fs.readFileSync(`${config.basePathSrc}database/limit.json`).toString())

export const client = new Client({
  //   restartOnAuthFail: true,
  //   webVersionCache: {
  //     type: "remote",
  //     remotePath:
  //       "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2410.1.html",
  //   },
  puppeteer: {
    executablePath: "/usr/bin/google-chrome",
    // args: ["--no-sandbox"],
    headless: true,
    // headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      // "--disable-dev-shm-usage",
      // "--disable-accelerated-2d-canvas",
      // "--no-first-run",
      // "--no-zygote",
      // "--single-process",
      // "--disable-gpu",
    ],
  },
  authStrategy: new LocalAuth(),
});

client.on("ready", () => {
  console.log("Client ready...")
})

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("SCAN QR")
});

export const shutdown = async () => {
  console.log("Shutting down bot...");
  try {
    // Menutup sesi WhatsApp dengan benar
    await client.destroy();
    console.log("Client destroyed successfully.");
  } catch (error) {
    console.error("Error while shutting down client:", error);
  }
  process.exit(0); // Mengakhiri proses
};

// Menangani sinyal sistem untuk shutdown
process.on("SIGINT", shutdown); // Ketika Ctrl+C ditekan
process.on("SIGTERM", shutdown); // Ketika proses dihentikan secara manual
process.on("exit", shutdown);

client.on("disconnected", (reason) => {
  console.log(reason);
});


const message = new Messages()

client.on("message", async (msg) => {
  const isUserAdded = _limit.find((user: { userId: string; }) => user.userId === msg.from)
  const _limitLenght = _limit.length
  const user = await msg.getContact();
  if(isUserAdded === undefined) {
    _limit.push({ "id": Math.floor(_limitLenght + 1), "userId": msg.from, "name": user.pushname, "convertToolsUsed": 0, "chatAiUsed": 0 })
    fs.writeFileSync(`${config.basePathSrc}database/limit.json`, JSON.stringify(_limit))
  }

  message.handleMessage(msg)
});

client.initialize();
