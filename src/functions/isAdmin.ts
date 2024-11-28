import config from '../config/config.json';
const admin = config.admin
const adminList: string[] = admin.map((item: { userId: any }) => item.userId);

export const isAdmin = (userId: string) => {
    if(adminList.includes(userId)) return true
    return false
};
