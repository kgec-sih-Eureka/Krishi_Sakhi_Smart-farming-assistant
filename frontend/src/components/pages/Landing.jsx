import React from "react";
import { Link } from "react-router";

export function Landing() {
    return (
        <>
        <h1>This is Landing Page</h1>
        <Link
            to='/signup'
        >
        sign up
        </Link>
        <Link
            to='/login'
        >
        log in
        </Link>
        </>
    )
}