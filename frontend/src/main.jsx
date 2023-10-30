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
                            headerBg: "#2da58a",
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
