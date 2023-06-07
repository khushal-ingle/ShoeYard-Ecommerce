import React from "react";
import { RotatingLines } from "react-loader-spinner"
import "./Loader.css";
export function Loader() {
    return (
        <div className="loader-wrapper">
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                margin="auto"
                visible={true}
            />;
        </div>
    );
}