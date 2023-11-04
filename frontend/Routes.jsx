import { Route, useLocation, Routes as BrowserRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./src/components/Layout";
import Workers from "./src/pages/Workers";
import AddWorker from "./src/pages/AddWorker";
import AddAttandance from "./src/pages/AddAttandance";
import EditWorker from "./src/pages/EditWorker";
import ViewAttandance from "./src/pages/ViewAttandance";
import AddFuelDetails from "./src/pages/AddFuelDetails";
import ViewFuelRecord from "./src/pages/ViewFuelRecord";
import AddPickupDetails from "./src/pages/AddPickupDetails";
import DeliveryDetails from "./src/pages/DeliveryDetails";
import ViewDeliveryRecord from "./src/pages/ViewDeliveryRecord";
import ViewCashRecord from "./src/pages/ViewCashRecord";
import ChangePassword from "./src/pages/ChangePassword";
import ViewIndividualCash from "./src/pages/ViewIndividualCash";

const Routes = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <BrowserRoutes location={location}>
                <Route path="/" element={<Layout />}>
                    <Route path="/workers">
                        <Route index element={<Workers />} />
                        <Route path="add" element={<AddWorker />} />
                        <Route path="edit/:id" element={<EditWorker />} />
                    </Route>
                    <Route path="/attandance">
                        <Route index element={<AddAttandance />} />
                        <Route path="view" element={<ViewAttandance />} />
                    </Route>
                    <Route path="/fuel">
                        <Route index element={<AddFuelDetails />} />
                        <Route path="record" element={<ViewFuelRecord />} />
                    </Route>
                    <Route path="/parcel">
                        <Route path="record" element={<AddPickupDetails />} />
                        <Route path="delivery" element={<DeliveryDetails />} />
                        <Route path="view" element={<ViewDeliveryRecord />} />
                        <Route path="view-individual" element={<ViewIndividualCash />} />
                        <Route path="cash" element={<ViewCashRecord />} />
                    </Route>
                    <Route path="/change-password" element={<ChangePassword />} />
                </Route>
            </BrowserRoutes>
        </AnimatePresence>
    );
};

export default Routes;
