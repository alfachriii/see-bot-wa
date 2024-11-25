import admin from '../users/admin.json';
const adminList: string[] = admin.map((item: { userId: any }) => item.userId);

export const isAdmin = (userId: string) => {
    if(adminList.includes(userId)) return true
    return false
};
