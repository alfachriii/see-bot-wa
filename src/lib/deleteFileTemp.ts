import { unlink } from "fs";
import config from "../config/config.json"

export const deleteFile = (filePath: string) => {
  unlink(filePath, (err) => {
    if (err) {
      console.error(`Gagal menghapus file: ${filePath}`, err);
    }
  });
};
