import React from "react";
import { Link } from "react-router";

export function Home() {
    return (
        <>
        <h1>This is Home</h1>
        <Link
            to='chatbot'
        >
        Chatbot
        </Link>
        <Link
            to='market'
        >
        Market
        </Link>
        <Link
            to='crop-recommend'
        >
        Crop Recommend
        </Link>
        <Link
            to='disease-detection'
        >
        Disease Detection
        </Link>
        <Link
            to='farm'
        >
        Farm
        </Link>
        </>
    )
}