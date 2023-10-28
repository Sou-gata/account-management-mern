import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "../Routes.jsx";
import { ConfigProvider } from "antd";
import ContextProvider from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#70d8bd",
                    },
                    components: {
                        Menu: {
                            darkItemSelectedColor: "#70d8bd",
                            darkItemSelectedBg: "#70d8bd40",
                            darkItemColor: "#ffffff",
                            darkItemHoverColor: "#a3a3a3",
                        },
                        Table: {
                            footerBg: "#1f2a40",
                            headerBg: "#3da58a",
                            headerColor: "#ffffff",
                            rowHoverBg: "#70d8bd20",
                        },
                        DatePicker: {
                            activeBg: "#1f2a40",
                            activeBorderColor: "#70d8bd",
                        },
                        Modal: {
                            titleColor: "#70d8bd",
                            contentBg: "#1f2a40",
                            footerBg: "#1f2a40",
                            headerBg: "#1f2a40",
                        },
                    },
                }}
            >
                <RouterProvider router={router} />
            </ConfigProvider>
        </ContextProvider>
    </React.StrictMode>
);

let gray = {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
    },
    black = {
        100: "#d0d1d5",
        200: "#a1a4ab",
        300: "#727681",
        400: "#1f2a40",
        500: "#141b2d",
        600: "#101624",
        700: "#0c101b",
        800: "#080b12",
        900: "#040509",
    },
    green = {
        100: "#dbf5ee",
        200: "#b7ebde",
        300: "#94e2cd",
        400: "#70d8bd",
        500: "#4cceac",
        600: "#3da58a",
        700: "#2e7c67",
        800: "#1e5245",
        900: "#0f2922",
    },
    red = {
        100: "#f2dcdb",
        200: "#e5b9b7",
        300: "#d79592",
        400: "#ca726e",
        500: "#bd4f4a",
        600: "#973f3b",
        700: "#712f2c",
        800: "#4c201e",
        900: "#26100f",
    },
    indigo = {
        100: "#e1e2fe",
        200: "#c3c6fd",
        300: "#a4a9fc",
        400: "#868dfb",
        500: "#6870fa",
        600: "#535ac8",
        700: "#3e4396",
        800: "#2a2d64",
        900: "#151632",
    };
