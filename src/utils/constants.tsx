import { GoHome } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import { FiBox } from "react-icons/fi";


export const navitems = [
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