import React, { lazy } from "react"
import OperationDetail from "../pages/OperationDetail";


const HomePage = lazy(() => import("../pages/Home"))
const RoomDetail = lazy(() => import("../pages/RoomDetail"))
const MetricsPage = lazy(() => import("../pages/Metrics"))

const routes = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/rooms/:guid",
        element: <RoomDetail />,
    },
    {
        path: "/operations/:guid",
        element: <OperationDetail />,
    },
    {
        path: "/metrics",
        element: <MetricsPage />,
    }
]

export default routes