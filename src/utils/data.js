import { LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuLayoutGrid,} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: 1,
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
    {
        id: 2,
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income",
    },
    {
        id: 3,
        label: "Expenses",
        icon: LuHandCoins,
        path: "/expenses",
    },
    {
        id: 4,
        label: "Logout",
        icon: LuLayoutGrid,
        path: "/logout",
    }
];