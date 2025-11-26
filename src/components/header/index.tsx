'use client'
import Link from "next/link"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import WalletButton from "./WalletButton"
import { navitems } from "@/utils/constants"
import { FiBox } from "react-icons/fi"
import Logo from "./Logo"
import { CoolMode } from "../ui/cool-mode"

export default function Header() {
    const pathname = usePathname()
    return (
        <header className="py-2 px-4">
            <div className="flex justify-between items-center">
                <Logo />
                <nav className="hidden sm:block">
                    <ul className="flex items-center gap-4 xl:gap-8">
                        {
                            navitems.map((item, i) => {
                                const isActive = pathname === item.url;
                                return (
                                    <Link href={`${item.url}`} key={i}>
                                        <li className={`font-bold ${isActive ? 'text-primary' : ''}`}>{item.title}</li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </nav>
                <div className="flex items-center gap-4">
                    <CoolMode
                        options={{
                            particle:"/media/logo-icon.svg",
                            speedUp:4,
                        }}
                    >
                        <Button variant="outline" className="border-primary hidden md:flex">Buy PLT</Button>
                    </CoolMode>
                    <WalletButton />
                </div>

                <MobileMenu />
            </div>
        </header>
    )
}

const MobileMenu = () => {
    const pathname = usePathname()
    return (
        <>
            <nav className="fixed bottom-0 md:hidden w-full backdrop-blur-md py-3 px-2.5 z-50">
                <ul className="grid grid-cols-4 gap-4">
                    {
                        navitems.map((item, i) => {
                            const isActive = pathname === item.url;
                            if (item.hideMobile) return;
                            return (
                                <Link href={`${item.url}`} key={i} className={`font-medium space-y-1.5 text-center ${isActive ? 'text-primary' : ''}`}>
                                    {item.icon && <item.icon size={14} className="mx-auto" />}
                                    <li className="text-xs font-medium">{item.title}</li>
                                </Link>
                            )
                        })
                    }
                    <Link href={`#`} className={`font-medium space-y-1.5 text-center`}>
                        <FiBox size={14} className="mx-auto" />
                        <li className="text-xs font-medium">Buy</li>
                    </Link>
                </ul>
            </nav>
        </>
    )
}
