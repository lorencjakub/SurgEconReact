import React, { lazy } from "react"


const HomePage = lazy(() => import("../pages/Home"))
const Room = lazy(() => import("../pages/Room"))

const routes = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/rooms/:guid",
        element: <Room />,
    },
    {
        path: "/operations",
        element: <Room />,
    },
    {
        path: "/operations/:guid",
        element: <Room />,
    },
    {
        path: "/metrics",
        element: <Room />,
    }
]

export default routes