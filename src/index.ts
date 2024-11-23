import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import commands from "./commands";

export const client = new Client({
//   restartOnAuthFail: true,
//   webVersionCache: {
//     type: "remote",
//     remotePath:
//       "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2410.1.html",
//   },
  puppeteer: {
    executablePath: "/usr/bin/google-chrome",
    // headless: true,
    // args: [
    //   "--no-sandbox",
    //   "--disable-setuid-sandbox",
    //   "--disable-dev-shm-usage",
    //   "--disable-accelerated-2d-canvas",
    //   "--no-first-run",
    //   "--no-zygote",
    //   "--single-process",
    //   "--disable-gpu",
    // ],
  },
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client Ready...");
});

export const shutdown = async () => {
    console.log('Shutting down bot...');
    try {
        // Menutup sesi WhatsApp dengan benar
        await client.destroy();
        console.log('Client destroyed successfully.');
    } catch (error) {
        console.error('Error while shutting down client:', error);
    }
    process.exit(0); // Mengakhiri proses
};

// Menangani sinyal sistem untuk shutdown
process.on('SIGINT', shutdown); // Ketika Ctrl+C ditekan
process.on('SIGTERM', shutdown); // Ketika proses dihentikan secara manual
process.on('exit', shutdown);

client.on("disconnected", (reason) => {
    console.log(reason)
})

client.on("message", (msg) => {
  for(const command of commands) {
    command.handle(msg)
  }
});

client.initialize();
