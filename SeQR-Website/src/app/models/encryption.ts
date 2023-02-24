import * as CryptoJS from 'crypto-js'; 
import { environment } from 'src/environments/environment';
export class Encryption{
    key: string = environment.encryption.key;
    iv: string = environment.encryption.iv;

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