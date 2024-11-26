import { drive } from "./googleAuth";
import { fileURLToPath } from "url";
import { dirname } from "path";
import config from "../config/config.json"
import * as fs from "fs";

const setFilePublic = async (fileId: string) => {
  try {
    // Membuat file dapat diakses publik
    const res = await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader", // Membaca file (akses publik)
        type: "anyone", // Akses untuk siapa saja yang memiliki tautan
      },
    });
  } catch (error) {
    console.error("Error making file public:", error);
  }
};

// Fungsi untuk upload file
export async function uploadFileToDrive(
  typeFile: string,
  ext: string,
  nameFileUp: string
) {
  const fileMetadata = {
    name: nameFileUp,
    mimeType: `${typeFile}/${ext}`,
    parents: ["1tKoq0cFZk3rJAkSfnHNzcbn_1CXhuN9T"],
  };

  const filePath = `${config.basePathTemp}${nameFileUp}.${ext}`;
  const media = {
    mimeType: `${typeFile}/${ext}`,
    body: fs.createReadStream(filePath),
  };

  try {
    const res = await drive.files.create({
      media: media,
      requestBody: fileMetadata,
      fields: "id, webViewLink",
    });
    await setFilePublic(res.data.id || "");
    return res.data.id;
  } catch (err) {
    return ""
  }
}
