// import * as fs from "fs"
// import config from "../config/config.json"

// let _limit = JSON.parse(fs.readFileSync(`${config.basePathSrc}database/limit.json`).toString())

// export const isUserAdded = await (msg) => {
//     const isUserAdded = _limit.find((user: { userId: string; }) => user.userId === msg.from)
//     const user = await msg.getContact();
//     if(isUserAdded === undefined) {
//       _limit.push({ "userId": msg.from, "name": user.pushname, "convertToolsUsed": 0 })
//       fs.writeFileSync(`${config.basePathSrc}database/limit.json`, JSON.stringify(_limit))
//     }
// }