'use client'
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import BorderEdges from "../BorderEdges"
import { MdOutlineWallet } from "react-icons/md"
import { usePathname } from "next/navigation"

export default function Header() {
    const pathname = usePathname()
    const navitems = [
        {
            title: "Explore",
            url: '/'
        },
        {
            title: "Stake",
            url: '/stake'
        },
        {
            title: "Referral",
            url: '/referral'
        },
        {
            title: "About",
            url: '/about'
        },
    ]
    return (
        <header className="py-3 px-4">
            <div className="flex justify-between items-center">
                <Logo />
                <nav className="hidden sm:block">
                    <ul className="flex items-center gap-4">
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
                    <Button variant="outline" className="border-primary">Buy PLT</Button>
                    <BorderEdges padding={3} cornerColor="#1297F5" cornerThickness={1}>
                        <Button>Connect <MdOutlineWallet size={16} />
                        </Button>
                    </BorderEdges>
                </div>
            </div>
        </header>
    )
}

export const Logo = () => {
    return (
        <Image src="/media/logo2.svg" alt="logo" height={40} width={40} />
    )
}