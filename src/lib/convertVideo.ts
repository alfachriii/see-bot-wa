import ffmpeg from "fluent-ffmpeg";
import config from "../config/config.json";

// Fungsi untuk mengonversi video
export const convertVideo = (
  inputFilePath: string,
  fileName: string,
  outputFormat: string
) => {
  const outputFilePath = `${config.basePathTemp}${fileName}.${outputFormat}`;
  ffmpeg(inputFilePath)
    .output(outputFilePath)
    .on("error", (err: Error) => {
      console.error("Error saat konversi video: ", err.message);
    })
    .run();
    return outputFilePath;
};
