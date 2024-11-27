import StealthPlugin from "puppeteer-extra-plugin-stealth";
import puppeteer from "puppeteer-extra";
import { url } from "inspector";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

puppeteer.use(StealthPlugin());

export const downloadTiktok = async (url: string) => {
  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/google-chrome",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-background-timer-throttling",
      "--disable-renderer-backgrounding",
      "--disable-backgrounding-occluded-windows",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--enable-features=NetworkService,NetworkServiceInProcess",
    ],
  }); // Ubah ke `true` jika tidak perlu melihat browser
  const page = await browser.newPage();
  await page.setCacheEnabled(true);

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
  );
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  });
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => false,
    });
  });

  await page.setViewport({ width: 1280, height: 800 });
  // Akses situs SnapInsta
  await page.goto("https://snaptik.app/", {
    waitUntil: "networkidle0",
    timeout: 60000,
  });

  // Masukkan URL video/gambar Instagram
  const inputSelector = "#url"; // Selektor input box
  await page.waitForSelector(inputSelector, { timeout: 60000 });
  await page.type(inputSelector, url); // Ganti dengan URL Instagram

  // Klik tombol download
  const downloadButtonSelector = "#hero > div > form > button"; // Selektor tombol download
  await page.waitForSelector(downloadButtonSelector, { timeout: 10000, visible: true });
  await delay(1500);
  await page.click(downloadButtonSelector);

  const type = url.split("/")[4];

  const downloadLink: string[] = [];

  // cek jika foto dapatkan link download dengan cara ini
  if (type === "photo") {
    const divParentSelector = "#download > div.columns.is-multiline.mt-3";
    await page.waitForSelector(divParentSelector, {visible: true});
    await delay(1000);
    // const divParentExists = (await page.$(divParentSelector)) !== null;

    // mengecek ada berapa foto yang bisa di download
    const childCount = await page.$eval(divParentSelector, (element) => {
      return element.children.length; // Mengembalikan jumlah child elements
    });

    // melakukan loop untuk mengambil semua link download foto
    await delay(1000);
    for (let i: number = 1; i <= childCount; i++) {
      const link = await page.$eval(
        `#download > div.columns.is-multiline.mt-3 > div:nth-child(${i}) > div > div > a`,
        (el) => el.href
      );
      downloadLink.push(link);
    }
    // Tutup browser
    await browser.close();

    const typeFile = "jpg";
    return { downloadLink, typeFile };
  }

  // jika tidak, download video
  // Tunggu hingga link unduhan muncul
  const downloadLinkSelector =
    "#download > div > div.video-links > a.button.download-file"; // Selektor link download
  await page.waitForSelector(downloadButtonSelector, { timeout: 10000 });

  downloadLink.push(await page.$eval(downloadLinkSelector, (el) => el.href));

  await browser.close();
  const typeFile = "mp4";
  return { downloadLink, typeFile };
};