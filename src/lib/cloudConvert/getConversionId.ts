import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
dotenv.config();

const ccApiUrl = process.env.CC_API_URL;
const apiKey = process.env.CC_API_KEY;

export const getConversionId = async (
  fileIdUpload: string,
  outputFormat: string
) => {
  try {
    const data = {
      input: "upload",
      file: fileIdUpload,
      format: outputFormat,
    };
    const convertResponse: AxiosResponse = await axios.post(
      `${ccApiUrl}convert`,
      data,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return convertResponse.data.data.id;
  } catch (error) {
    console.log(error);
  }
};

getConversionId("c7ad2764-36e1-4f39-a9a7-5de4181fb47d", "svg")