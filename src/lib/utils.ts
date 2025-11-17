import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // const { value, selectionStart, id } = e.currentTarget;
  const { value } = e.currentTarget;
  const key = e.key;

  // Allow navigation and deletion keys
  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
  if (allowedKeys.includes(key)) return;

  // Block non-numeric and non-dot characters
  if (!/[\d.]/.test(key)) {
    e.preventDefault();
    return;
  }

  // Prevent multiple dots
  if (key === "." && value.includes(".")) {
    e.preventDefault();
    return;
  }

  // Prevent more than 6 digits after the decimal
  // const dotIndex = value.indexOf(".");
  // if (dotIndex !== -1 && selectionStart !== null && selectionStart > dotIndex) {
  //     const decimals = value.slice(dotIndex + 1);
  //     if ((id === "x" && decimals.length >= xToken.decimals) || ((id === "y" && decimals.length >= yToken.decimals))) {
  //         e.preventDefault();
  //         return;
  //     }
  // }
};


export function shortenAddress(address: string, startChars: number = 3, endChars: number = 5) {
    if (address.length <= startChars + endChars) {
        return address
    }
    const start = address.substring(0, startChars)
    const end = address.substring(address.length - endChars)
    return `${start}...${end}`
}