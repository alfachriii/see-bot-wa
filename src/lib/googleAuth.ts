import { google } from "googleapis";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import config from "../config/config.json"

// Autentikasi dengan service account
const auth = new google.auth.GoogleAuth({
  keyFile: `${config.basePathSrc}config/seebot-442616-5c485e177da2.json`,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

export const drive = google.drive({ version: "v3", auth });
