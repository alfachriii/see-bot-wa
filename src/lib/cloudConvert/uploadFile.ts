import axios from "axios";
import config from "../../config/config.json";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.CC_API_KEY;
export async function uploadFile(filePath: string) {
  try {
    console.log(apiKey);
    const formData = new FormData();
    const file = new File([filePath], "file");
    formData.append("file", file);

    console.log(formData);

    const response = await axios.post(
      "https://api.cloudconvert.com/v2/import/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("File uploaded:", response.data);
    return response.data.id;
  } catch (error) {
    console.error("Error during file upload:", error);
  }
}

// const filePath = `${config.basePathTemp}/pp.jpg`;  // Ganti dengan path file lokal Anda
// uploadFile(filePath);
