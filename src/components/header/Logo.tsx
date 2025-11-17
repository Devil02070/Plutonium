import Image from "next/image";
import Link from "next/link";

export default function Logo() {
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