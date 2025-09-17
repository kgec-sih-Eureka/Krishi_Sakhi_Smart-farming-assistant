import React from "react";
import { Link } from "react-router";

export function Login() {
    return (
        <>
        <h1>This is Login</h1>
        <Link
            to='../user/userId'
        >
        Click to log in
        </Link>
        </>
    )
}