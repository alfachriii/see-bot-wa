import StealthPlugin from "puppeteer-extra-plugin-stealth";
import puppeteer from "puppeteer-extra";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

puppeteer.use(StealthPlugin());

export const downloadIg = async (url: string) => {
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
  await page.goto("https://snapinsta.app", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // Masukkan URL video/gambar Instagram
  const inputSelector = "#url"; // Selektor input box
  await page.waitForSelector(inputSelector, { timeout: 60000 });
  await page.type(inputSelector, url); // Ganti dengan URL Instagram

  // Klik tombol download
  const downloadButtonSelector = "#btn-submit"; // Selektor tombol download
  await page.waitForSelector(downloadButtonSelector);
  await delay(1000)
  await page.click(downloadButtonSelector);

  //popup iklan
  const closeButton = "#close-modal";
  await page.waitForSelector(closeButton);
  await delay(1000);
  await page.click(closeButton);

  let downloadLink: string[] = []

  const divParentSelector = "#download > div.row";
  await page.waitForSelector(divParentSelector);
  await delay(1078);

  // mengecek ada berapa content yang bisa di download
  const childCount = await page.$eval(divParentSelector, (element) => {
    return element.children.length; // Mengembalikan jumlah child elements
  });

  // melakukan loop untuk mengambil semua link download
  await delay(1000);
  if(childCount > 1) {
    for (let i: number = 1; i <= childCount; i++) {
      const link = await page.$eval(
        `#download > div.row > div:nth-child(${i}) > div > div.media-box > div > a`,
        (el) => el.href
      );
      const type = await page.$eval(
        `#download > div.row > div:nth-child(${i}) > div > div.media-box > div > a`,
        (el) => el.textContent?.split(" ")[1].toLowerCase()
      );
      const typeFile = () => {
        if(type === "photo") return "jpg"
        return "mp4"
      }
      downloadLink.push(`${link}&&&${typeFile()}`);
    }

    // Tutup browser
    await browser.close();
    return { downloadLink };
  }

  // Tunggu hingga link unduhan muncul
  const downloadLinkSelector =
    "#download > div.row > div > div > div.media-box > div > a"; // Selektor link download
  await page.waitForSelector(downloadLinkSelector, { timeout: 60000 });

  // Ambil tautan unduhan
  downloadLink.push(await page.$eval(downloadLinkSelector, (el) => el.href));
  const textDownloadButton = await page.$eval(downloadLinkSelector, (el) =>
    el.textContent?.trim()
  ); // mengambil button yang berisi info tipe konten

  const ext = () => {
    const name = textDownloadButton?.split(" ")[1].toLocaleLowerCase();
    if (name === "photo") return "jpg";
    if (name === "video") return "mp4";
  };

  const typeFile = ext();

  // Tutup browser
  await browser.close();
  return { downloadLink, typeFile };
};
