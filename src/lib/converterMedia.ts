import axios from "axios";
import { uploadFile } from "./uploadFileToDrive";
import { url } from "inspector";
import dotenv from "dotenv"
dotenv.config()

const convertIoApiUrl = process.env.CONVERTIO_API_URL;
const apiKey = process.env.CONVERTIO_API_KEY;

export const converterMedia = async (fileUrl: string, outputFormat: string) => {
  console.log(apiKey);
  const convertResponse = await axios.post(
    `https://api.convertio.co/convert`,
    {
      url: fileUrl,
      target: outputFormat,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  console.log(convertResponse);
};

const validateApiKey = async () => {
  try {
    const response = await axios.get("https://api.convertio.co/ping", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    console.log("API Key is valid:", response.data);
  } catch (error) {
    console.error("API Key is invalid:");
  }
};

// validateApiKey();

// https://drive.google.com/file/d/1BsY7FKihqc3Cr5n_dhzmZqZkB5ClbDcA/view?usp=sharing
converterMedia(
  "https://drive.google.com/uc?export=download&id=1BsY7FKihqc3Cr5n_dhzmZqZkB5ClbDcA",
  "svg"
);
// const fileId = uploadFile("image", "jpg", "pp")
