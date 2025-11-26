"use client";

import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { monadTestnet } from "@reown/appkit/networks";
import { ProjectId } from "@/utils/env";

// 1. Get projectId at https://dashboard.reown.com
const projectId = ProjectId;

// 2. Create a metadata object
const metadata = {
    name: "Plutonium",
    description: "Plutonium",
    url: "https://mywebsite.com", // origin must match your domain & subdomain
    icons: ["https://avatars.mywebsite.com/"],
};

// 3. Create the AppKit instance
createAppKit({
    adapters: [new Ethers5Adapter()],
    metadata,
    networks: [monadTestnet],
    projectId,
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
    },
});

export function AppKitProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}