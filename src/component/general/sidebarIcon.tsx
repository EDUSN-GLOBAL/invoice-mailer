
import { FcFolder } from "react-icons/fc";
import { FcLibrary } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { removeTokenCookie } from "#/utils/cookies";

type IconType = {
    name: string;
    icon: JSX.Element;
    link?: string;
    desc: string;
    action?: () => void ;
}

export const sideBarsMenus: IconType[] = [
    {
        name: "Files",
        icon: <FcFolder className="text-3xl" />,
        link: "/installments",
        desc: "Students file datas",
    },
    {
        name: "Create",
        icon: <FcLibrary className="text-3xl" />,
        link: "/create",
        desc: "create invoice and receipt",
    },
    {
        name: "Students",
        icon: <FaUsers className="text-3xl " />,
        link: "/students",
        desc: "Student lists",
    },
    {
        name: "Logout",
        icon: <MdLogout className="text-3xl" />,
        desc: "Logout",
        action: () => {

            // Implement the logout action here
            removeTokenCookie();
        },
        // Omitting the 'link' property for Logout
    },
];
