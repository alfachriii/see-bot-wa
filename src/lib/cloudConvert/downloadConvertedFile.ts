import config from "../../config/config.json";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const ccApiUrl = process.env.CC_API_URL;
const apiKey = process.env.CC_API_KEY;

export const downloadConvertedFile = async (conversionId: string | void) => {
  try {
    const responseDownloadedFile = await axios.post(
      `${ccApiUrl}download/${conversionId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        responseType: "stream", // Untuk menangani file binari
      }
    );

    // Menyimpan atau memproses file hasil konversi
    const fileName = responseDownloadedFile.headers["content-disposition"]
      .split("filename=")[1]
      .replace(/"/g, "");
    const fileStream = responseDownloadedFile.data;
    const filePath = `${config.basePathTemp}${fileName}`;

    // Simpan file ke disk atau proses sesuai kebutuhan
    const fs = require("fs");
    const writer = fs.createWriteStream(filePath);
    fileStream.pipe(writer);
    return filePath;
  } catch (error) {
    console.log("ERROR while download converted file: ", error);
  }
};
