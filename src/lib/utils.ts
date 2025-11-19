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





const subscripts: Record<string, string> = {
  "0": "₀", "1": "₁", "2": "₂", "3": "₃",
  "4": "₄", "5": "₅", "6": "₆", "7": "₇",
  "8": "₈", "9": "₉"
};

function toSubscript(n: number) {
  return n.toString().split("").map(d => subscripts[d] ?? "").join("");
}


export function formatTinyEth(raw: number) {
  if (!raw || raw === 0) return "0";

  // FORCE normal notation (avoid 3e-7)
  const str = raw.toFixed(18); // gives "0.000000340000000000"

  // Match: decimal zeros + significant digits
  const match = str.match(/^0\.(0*)([1-9]\d*)/);

  if (!match) return raw.toString();

  const leadingZeros = match[1].length;        // count zeros (6)
  const significant = match[2].slice(0, 3);    // take first 3 digits

  return `0.0${toSubscript(leadingZeros)}${significant}`;
}

// export function formatTinyEth(raw:number) {
//   // const num = Number(ethers.formatEther(raw));

//   if (raw === 0) return "0";

//   const str = raw.toString(); // "0.0000000040238"

//   // Count zeros after decimal until a non-zero appears
//   const match = str.match(/0\.(0*)([1-9]\d*)/);

//   if (!match) return str; // fallback for normal numbers

//   const leadingZeros = match[1].length;   // 9
//   const significant = match[2].slice(0, 3); // "402"

//   return `0.0${toSubscript(leadingZeros)}${significant}`;
// }