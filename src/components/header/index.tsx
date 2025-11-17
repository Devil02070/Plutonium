'use client'
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import BorderEdges from "../BorderEdges"
import { MdOutlineWallet } from "react-icons/md"
import { usePathname } from "next/navigation"

import { GoHome } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import { FiBox } from "react-icons/fi";





const navitems = [
    {
        title: "Home",
        url: '/',
        icon: GoHome,
        hideMobile: false,
    },
    {
        title: "Explore",
        url: '/explore',
        icon: MdOutlineExplore,
        hideMobile: false,
    },
    {
        title: "Stake",
        url: '/stake',
        icon: BiCoinStack,
        hideMobile: false,
    },
    {
        title: "About",
        url: '/about',
        icon: FiBox,
        hideMobile: true,
    },

]

export default function Header() {
    const pathname = usePathname()
    return (
        <header className="py-3 pb-0 md:pb-3 px-4">
            <div className="flex justify-between items-center">
                <Logo />
                <nav className="hidden sm:block">
                    <ul className="flex items-center gap-4 2xl:gap-8">
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
                    <Button variant="outline" className="border-primary hidden md:flex">Buy PLT</Button>
                    <BorderEdges padding={3} cornerColor="#1297F5" cornerThickness={1}>
                        <Button>Connect <MdOutlineWallet size={16} />
                        </Button>
                    </BorderEdges>
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

export const Logo = () => {
    return (
        <>

            <Link href="/" className="hidden md:block">
                <Image src="/media/Logo-main.svg" alt="logo" height={72} width={237} className="hidden md:block" />
            </Link>

            <Link href="/" className="md:hidden">
                <Image src="/media/logo-icon.svg" alt="logo" height={64} width={64} />
            </Link>


        </>
    )
}