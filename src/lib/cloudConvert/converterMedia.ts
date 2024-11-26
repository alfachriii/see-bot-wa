import axios from "axios";
import fs from "fs";
import config from "../../config/config.json";
import dotenv from "dotenv";
import CloudConvert from "cloudconvert";
import FormData from "form-data";
import path from "path";
dotenv.config();

const apiKey = process.env.CC_API_KEY; // Ganti dengan API Key CloudConvert Anda

const cloudConvert = new CloudConvert(`${apiKey}`);

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const convertFile = async (urlFile: string, fileName: string, outputFormat: string) => {

  try {
    const response = await axios.post(
      'https://api.cloudconvert.com/v2/convert',
      {
        input: {
          provider: 'download',
          url: urlFile
        },
        output_format: outputFormat, // Ubah sesuai format tujuan
        filename: `${fileName}.${outputFormat}`
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Contoh Penggunaan
convertFile("https://drive.google.com/uc?export=download&id=1BsY7FKihqc3Cr5n_dhzmZqZkB5ClbDcA", "pp", "svg");


