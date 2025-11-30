import React, { FC } from 'react'
import {
    Paper,
    Grid,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
    Checkbox,
    FormGroup,
    FormControlLabel
} from "@mui/material"
import PieChart from "../components/Charts/PieChart"
import BarChart from "../components/Charts/BarChart"
import LineChart from "../components/Charts/LineChart"

import { default as rooms } from "../components/mocks/rooms.json"
import { default as operations } from "../components/mocks/operations.json"
import { default as tools } from "../components/mocks/operations_tools.json"
import { default as materials } from "../components/mocks/operations_materials.json"
import { default as employes } from "../components/mocks/operations_employes.json"
import { default as devices } from "../components/mocks/operations_devices.json"
import {IRoom, IRoomRow} from "../../base/utils/Axios/types";

const CHART_HEIGHT = 400

const CHART_TYPES = [
    { value: "pie", label: "Koláčový graf" },
    { value: "line", label: "Čárový graf" },
    { value: "bar", label: "Sloupcový graf" }
]

const DATASETS = [
    { value: "rooms", label: "Místnosti" },
    { value: "operations", label: "Operace" },
    { value: "employes", label: "Zaměstnanci" },
    { value: "materials", label: "Materiály" },
    { value: "tools", label: "Nástroje" },
    { value: "devices", label: "Zařízení" }
]

const EXCLUDED_FIELDS = ['id', 'identifier', 'udi_code']

const Metrics: FC = () => {
    const [selectedChart, setSelectedChart] = React.useState<string>("")
    const [selectedDataset, setSelectedDataset] = React.useState<string>("")
    const [selectedFields, setSelectedFields] = React.useState<string[]>([])

    const renderChart = () => {
        if (!selectedChart) return null

        switch (selectedChart) {
            case "pie":
                return <PieChart data={[]} />
            case "line":
                return <LineChart data={{ id: "", data: [] }} />
            case "bar":
                return <BarChart data={[]} />
            default:
                return null
        }
    }

    const getDataset = () => {
        switch (selectedDataset) {
            case "rooms":
                return rooms
            case "operations":
                return operations
            case "employes":
                return employes
            case "materials":
                return materials
            case "tools":
                return tools
            case "devices":
                return devices
            default:
                return []
        }
    }

    // const preparePieChartData = () => {
    //     dataset: any[] = getDataset()
    //
    //     if () dataset.map(d => ({
    //         id: d.id,
    //         label: d.room.identifier,
    //         value: d.operations.length
    //     }))
    //
    //
    //
    // }

    // Získání dostupných polí z datasetu
    const getAvailableFields = () => {
        const dataset = getDataset()
        if (dataset.length === 0) return []

        const fields = Object.keys(dataset[0])
        return fields.filter(field => !EXCLUDED_FIELDS.includes(field))
    }

    const handleFieldChange = (field: string) => {
        setSelectedFields(prev => {
            if (prev.includes(field)) {
                return prev.filter(f => f !== field)
            } else {
                return [...prev, field]
            }
        })
    }

    // Render filtrů
    const renderFilters = () => {
        const fields = getAvailableFields()

        return (
            <Box sx={{
                mt: 2,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                border: 1,
                borderColor: 'divider'
            }}>
                <Typography variant="subtitle1" gutterBottom>
                    Vyberte pole pro zobrazení:
                </Typography>
                <FormGroup>
                    {fields.map(field => (
                        <FormControlLabel
                            key={field}
                            control={
                                <Checkbox
                                    checked={selectedFields.includes(field)}
                                    onChange={() => handleFieldChange(field)}
                                />
                            }
                            label={field}
                        />
                    ))}
                </FormGroup>
            </Box>
        )
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                width: '100%',
                backgroundColor: 'background.default',
                borderRadius: 5
            }}
        >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Metriky
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Typ grafu</InputLabel>
                        <Select
                            value={selectedChart}
                            label="Typ grafu"
                            onChange={(e) => {
                                setSelectedChart(e.target.value)
                                setSelectedDataset("")
                                setSelectedFields([])
                            }}
                        >
                            {CHART_TYPES.map(({value, label}) => (
                                <MenuItem value={value} key={`chart_type_${value}`}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {selectedChart && (
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Dataset</InputLabel>
                            <Select
                                value={selectedDataset}
                                label="Dataset"
                                onChange={(e) => {
                                    setSelectedDataset(e.target.value)
                                    setSelectedFields([])
                                }}
                            >
                                {DATASETS.map(({value, label}) => (
                                    <MenuItem value={value} key={`dataset_${value}`}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )}

                {selectedDataset && (
                    <Grid item xs={12}>
                        {renderFilters()}
                    </Grid>
                )}

                {selectedChart && selectedDataset && selectedFields.length > 0 && (
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                height: CHART_HEIGHT,
                                width: '100%',
                                bgcolor: 'background.paper',
                                p: 2,
                                borderRadius: 1
                            }}
                        >
                            {renderChart()}
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Paper>
    )
}

export default Metrics