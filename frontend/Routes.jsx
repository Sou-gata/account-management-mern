import { createBrowserRouter } from "react-router-dom";
import Layout from "./src/components/Layout";
import Workers from "./src/pages/Workers";
import AddWorker from "./src/pages/AddWorker";
import AddAttandance from "./src/pages/AddAttandance";
// import ViewWorker from "./src/pages/ViewWorker";
import EditWorker from "./src/pages/EditWorker";
import ViewAttandance from "./src/pages/ViewAttandance";
import AddFuelDetails from "./src/pages/AddFuelDetails";
import ViewFuelRecord from "./src/pages/ViewFuelRecord";
import AddPickupDetails from "./src/pages/AddPickupDetails";
import DeliveryDetails from "./src/pages/DeliveryDetails";
import ViewDeliveryRecord from "./src/pages/ViewDeliveryRecord";
import ViewCashRecord from "./src/pages/ViewCashRecord";
import ChangePassword from "./src/pages/ChangePassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/workers",
                children: [
                    { path: "", element: <Workers /> },
                    { path: "add", element: <AddWorker /> },
                    // { path: "view/:id", element: <ViewWorker /> },
                    { path: "edit/:id", element: <EditWorker /> },
                ],
            },
            {
                path: "/attandance",
                children: [
                    { path: "", element: <AddAttandance /> },
                    { path: "view", element: <ViewAttandance /> },
                ],
            },
            {
                path: "/fuel",
                children: [
                    { path: "", element: <AddFuelDetails /> },
                    { path: "record", element: <ViewFuelRecord /> },
                ],
            },
            {
                path: "/parcel",
                children: [
                    { path: "record", element: <AddPickupDetails /> },
                    { path: "delivery", element: <DeliveryDetails /> },
                    { path: "view", element: <ViewDeliveryRecord /> },
                    { path: "cash", element: <ViewCashRecord /> },
                ],
            },
            {
                path: "/change-password",
                element: <ChangePassword />,
            },
        ],
    },
]);

export default router;
