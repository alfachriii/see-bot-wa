import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import config from "../config/config.json";

ffmpeg.setFfmpegPath(config.ffmpegPath);

export const convertMp4ToMp3 = (
  fileName: string
): void => {
  const basePathTemp = config.basePathTemp
  ffmpeg(`${basePathTemp}${fileName}.mp4`)
    .outputOptions("-vn", "-ab", "128k", "-ar", "44100")
    .toFormat("mp3")
    .save(`${basePathTemp}${fileName}.mp3`)
    .on("end", () => console.log("Convert Successfully"))
    .on("error", (err) => console.log("Convert Failed..", err))
    .run();
};
convertMp4ToMp3("toss")
