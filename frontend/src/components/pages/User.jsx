import React from "react";
import { Outlet } from "react-router";
import { Navbar, BackButton } from "../index";

export function User() {
  return (
    <>
      <Navbar />
      <BackButton />
      <Outlet />
    </>
  );
}
