import axios from 'axios';
import fs from 'fs';
import path from 'path';
import * as readline from "readline"
import config from "../config/config.json"
import dotenv from "dotenv"
import { google } from "googleapis"

dotenv.config()

const fileId = '1RBVylzlzAxD48gYqVg57oq2QTysQo8ZN';  // Ganti dengan ID file Anda
const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

export const downloadFile = async (url: string, outputPath: string): Promise<void> => {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream', // Menggunakan stream untuk mendownload file
        });

        // Tulis stream ke file
        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);

        await new Promise<void>((resolve, reject) => {
            writer.on('finish', () => {
                resolve();
            });
            writer.on('error', (error) => {
                console.error("Terjadi kesalahan saat mendownload:", error);
                reject(error);
            });
        });
    } catch (error) {
        console.error("Gagal mendownload file:", error);
    }
};

// downloadFile("https://d.rapidcdn.app/snapinsta?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vbzEvdi90MTYvZjEvbTg2L0U0NDRGNUExOEQwOUU3NkI0RUMwNUVCMzRGNDVENUE2X3ZpZGVvX2Rhc2hpbml0Lm1wND9zdHA9ZHN0LW1wNCZlZmc9ZXlKeFpWOW5jbTkxY0hNaU9pSmJYQ0pwWjE5M1pXSmZaR1ZzYVhabGNubGZkblJ6WDI5MFpsd2lYU0lzSW5abGJtTnZaR1ZmZEdGbklqb2lkblJ6WDNadlpGOTFjbXhuWlc0dVkyeHBjSE11WXpJdU56SXdMbUpoYzJWc2FXNWxJbjAmX25jX2NhdD0xMDgmdnM9MTYyNTYzMDY5NDY1MzUxOV8xOTQ5MjU0OTQmX25jX3ZzPUhCa3NGUUlZVW1sblgzaHdkbDl5WldWc2MxOXdaWEp0WVc1bGJuUmZjM0pmY0hKdlpDOUZORFEwUmpWQk1UaEVNRGxGTnpaQ05FVkRNRFZGUWpNMFJqUTFSRFZCTmw5MmFXUmxiMTlrWVhOb2FXNXBkQzV0Y0RRVkFBTElBUUFWQWhnNmNHRnpjM1JvY205MVoyaGZaWFpsY25OMGIzSmxMMGRQWTFZeGFIUm9ibkZ2UmtWSFVVZEJSMjh3YmtOa04xaHhValppY1Y5RlFVRkJSaFVDQXNnQkFDZ0FHQUFiQUJVQUFDYlFwYlN6a3V2UVB4VUNLQUpETXl3WFFDMGh5c0NERW04WUVtUmhjMmhmWW1GelpXeHBibVZmTVY5Mk1SRUFkZjRIQUElM0QlM0QmY2NiPTktNCZvaD0wMF9BWUJ2SEhnWDhDSWwxd0k3eVdtZGNmemZXbnFFVE9aOGhwVHFjNHdGVDZvSkFRJm9lPTY3NDdENUNBJl9uY19zaWQ9MTBkMTNiIiwiZmlsZW5hbWUiOiJTbmFwaW5zdGEuYXBwX3ZpZGVvX0U0NDRGNUExOEQwOUU3NkI0RUMwNUVCMzRGNDVENUE2X3ZpZGVvX2Rhc2hpbml0Lm1wNCJ9.RwE4g5IBXSarKMBZ3bTzIs-bHOi7lCyNJ0Y5T0T7ohc&dl=1&dl=1");