import * as CryptoJS from 'crypto-js'; 
export class Encryption{
    key: string = 'WWr6uNAfSUTRLO1qoHnfjAPnzfzSJ5Z1';
    iv: string = 'SHVXoDiMdH4PHQQ3yt0952Jglb39AmhH';

    getKey(): string {
        return this.key;
    }

    getIv(): string {
        return this.iv;
    }

    encryptData(data: any): string{
        var encryptedData: string = "";
        const key = CryptoJS.enc.Base64.parse(this.getKey());
        const iv = CryptoJS.enc.Base64.parse(this.getIv());
        encryptedData = (CryptoJS.AES.encrypt(data, key, { iv: iv })).toString();

        return encryptedData;
    }

    decryptData(data: any): string{
        var decryptedData: string = "";
        const key = CryptoJS.enc.Base64.parse(this.getKey());
        const iv = CryptoJS.enc.Base64.parse(this.getIv());
        decryptedData = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data, key, { iv: iv }))

        return decryptedData;
    }



}