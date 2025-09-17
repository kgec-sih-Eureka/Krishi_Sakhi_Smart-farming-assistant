import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "../index";

export function User() {
    return (
        <>
        <Navbar />
        <Outlet />
        </>
    )
}