import React, { FC } from 'react'
import {
    Paper,
    Grid,
    Box, MenuItem, Select
} from "@mui/material"
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import backendServices from "../../base/utils/Axios/ApiClient"
import { IRoomRow } from "../../base/utils/Axios/types"
import PieChart from "../components/Charts/PieChart"
import BarChart from "../components/Charts/BarChart"
import LineChart from "../components/Charts/LineChart"

import { default as operations } from "../components/mocks/operations.json"
import { default as operations_devices } from "../components/mocks/operations_devices.json"
import { default as operations_employes } from "../components/mocks/operations_employes.json"
import { default as operations_tools } from "../components/mocks/operations_tools.json"
import { default as operations_materials } from "../components/mocks/operations_materials.json"
import { default as room } from "../components/mocks/room.json"
import { default as room2 } from "../components/mocks/room2.json"




const CHART_HEIGHT = 400 // Fixní výška pro každý graf

const Metrics: FC = () => {
    // const allRoomsQuery = useQuery<IRoomRow[], AxiosError>({
    //     queryKey: ["all-rooms-query"],
    //     queryFn: backendServices.getAllRooms,
    //     enabled: true,
    //     initialData: [],
    //     placeholderData: []
    // })

    const [chart, setChart] = React.useState<string>("")
    const [dataset, setDataset] = React.useState<string>("")

    const getData = () => {
        if (chart == "pie"){
            if (dataset == "operations") {
                return operations
            }
        }
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                width: '100%',
                backgroundColor: 'background.default',
                borderRadius: 5
            }}
        >
            <Select
                value={chart}
                label="Typ grafu"
                onChange={(e) => setChart(e.target.value)}
                name="chart_select"
                data-testid="containers.layout.header.appbar.language_select"
            >
                {["pie", "line", "bar"].map((value: string) => {
                    return (
                        <MenuItem
                            value={value}
                            key={`language_option_${value}`}
                        >
                            {value}
                        </MenuItem>
                    )
                })}
            </Select>

            {chart != "" && <Select
                value={dataset}
                label="Data"
                onChange={(e) => setDataset(e.target.value)}
                name="data_select"
                data-testid="containers.layout.header.appbar.language_select"
            >
                {["rooms", "operations"].map((value: string) => {
                    return (
                        <MenuItem
                            value={value}
                            key={`language_option_${value}`}
                        >
                            {value}
                        </MenuItem>
                    )
                })}
            </Select>}

            {chart != "" && <Select
                value={dataset}
                label="Data"
                onChange={(e) => setDataset(e.target.value)}
                name="data_select"
                data-testid="containers.layout.header.appbar.language_select"
            >
                {["rooms", "operations"].map((value: string) => {
                    return (
                        <MenuItem
                            value={value}
                            key={`language_option_${value}`}
                        >
                            {value}
                        </MenuItem>
                    )
                })}
            </Select>}

            <Grid
                container
                direction="column"
                spacing={3}
                data-testid="pages.metrics.container"
            >
                {chart == "pie" && <Grid item>
                    <Box sx={{ height: CHART_HEIGHT, width: '100%' }}>
                        <PieChart data={{}} />
                    </Box>
                </Grid>
                }

                {chart == "line" && <Grid item>
                    <Box sx={{ height: CHART_HEIGHT, width: '100%' }}>
                        <LineChart data={{}} />
                    </Box>
                </Grid>
                }

                {chart == "bar" && <Grid item>
                    <Box sx={{ height: CHART_HEIGHT, width: '100%' }}>
                        <BarChart data={{}} />
                    </Box>
                </Grid>
                }
            </Grid>
        </Paper>
    )
}

export default Metrics