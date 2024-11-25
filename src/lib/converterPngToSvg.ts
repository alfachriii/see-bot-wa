import { exec } from "child_process";
import config from "../config/config.json";
import fs from "fs";
import path from "path";

export const convertPngToSvg = (pngFileName: string): void => {
  const basePathTemp = config.basePathTemp;
  const outPnmPath = `${basePathTemp}${pngFileName}.ppm`;
  const outSvgPath = `${basePathTemp}${pngFileName}.svg`;

  // ubah ke pnm dulu
  exec(
    `ffmpeg -i ${basePathTemp}${pngFileName}.png -pix_fmt rgb24 ${outPnmPath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`File berhasil dikonversi: ${stdout}`);
    }
  );
  // if (fs.existsSync(outPnmPath)) {
  setTimeout(() => {
    exec(
      `potrace ${outPnmPath} -s -o ${outSvgPath}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing potrace: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`SVG file saved as ${outSvgPath}`);
      }
    );
  }, 500);
  // }
};

convertPngToSvg("scene2");
