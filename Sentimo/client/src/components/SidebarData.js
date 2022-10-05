import React from "react";
import {
    BiGridAlt,
    BiUser,
    BiUserPlus,
    BiCategoryAlt,
    BiBox,
    BiLogOut
 } from "react-icons/bi";


export const SidebarData  = [
    {
        path: "/Dashboard",
        name: "Dashboard",
        icon: <BiGridAlt />
    },
    {
        path: "/UserProfile",
        name: "UserProfile",
        icon: < BiUser/>
    },
    {
        path: "/Users",
        name: "Users",
        icon: < BiUserPlus/>
    },
    {
        path: "/Category",
        name: "Category",
        icon: < BiCategoryAlt/>
    },
    {
        path: "/Inventory",
        name: "Inventory",
        icon: < BiBox/>
    },
    {
        path: "/Logout",
        name: "Logout",
        icon: <BiLogOut/>
    },
]