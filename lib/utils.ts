import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple encryption using base64 with a salt
export function encryptData(data: any): string {
  try {
    const salt = process.env.NEXT_PUBLIC_ENCRYPTION_SALT || "safar-capital";
    const jsonStr = JSON.stringify(data);
    const saltedData = jsonStr + salt;
    return btoa(saltedData);
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
}

// Decrypt data
export function decryptData(encryptedData: string): any {
  try {
    const salt = process.env.NEXT_PUBLIC_ENCRYPTION_SALT || "safar-capital";
    const decoded = atob(encryptedData);
    const jsonStr = decoded.slice(0, -salt.length);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}
