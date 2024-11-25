import { unlink } from "fs";
import config from "../config/config.json"

const deleteFile = (fileName: string) => {
  const filePath = `${config.basePathTemp}${fileName}`
  unlink(filePath, (err) => {
    if (err) {
      console.error(`Gagal menghapus file: ${filePath}`, err);
    } else {
      console.log(`Berhasil menghapus file: ${filePath}`);
    }
  });
};

deleteFile("9334178.jpg")