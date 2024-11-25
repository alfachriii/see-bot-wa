import axios from 'axios';
import fs from 'fs';
import path from 'path';
import * as readline from "readline"
import config from "../config/config.json"
import dotenv from "dotenv"
import { google } from "googleapis"

dotenv.config()
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI
const SCOPES = process.env.SCOPES

const fileId = '1RBVylzlzAxD48gYqVg57oq2QTysQo8ZN';  // Ganti dengan ID file Anda
const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

const downloadFile = async (url: string): Promise<void> => {
    try {
        console.log("Memulai download...");

        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream', // Menggunakan stream untuk mendownload file
        });

        // Tentukan nama file output, bisa disesuaikan dengan ekstensi file yang tepat
        const outputFileName = 'downloaded_file.jpg'; // Sesuaikan dengan tipe file yang diunduh
        const outputPath = path.join(__dirname, outputFileName);

        // Tulis stream ke file
        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);

        await new Promise<void>((resolve, reject) => {
            writer.on('finish', () => {
                console.log(`Download selesai! File disimpan sebagai: ${outputFileName}`);
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

// Panggil fungsi download dengan link file
downloadFile(fileUrl);