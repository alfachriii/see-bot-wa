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