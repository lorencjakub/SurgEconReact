import React, { FC } from 'react';
import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Box,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { default as operation } from '../components/mocks/operations_with_sources.json';
import { Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';
import PieChart from "../components/Charts/PieChart";

const CollapsibleDetail: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <Box
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    p: 1, // padding pro lepší klikatelnou oblast
                    borderRadius: 1, // zaoblené rohy pro hover efekt
                    '&:hover': {
                        backgroundColor: 'action.hover'
                    },
                }}
            >
                <Typography variant="h5">
                    Detail
                </Typography>
                <IconButton>
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>
            <Collapse in={isExpanded}>
                {children}
            </Collapse>
            <Divider sx={{ my: 2 }} />
        </>
    );
};


const OperationDetail: FC = () => {
    const navigate = useNavigate();

    const getDurationInHours = (startDate: string, endDate: string): number => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Výpočet rozdílu v milisekundách
        const diffMs = end.getTime() - start.getTime();

        // Převod na hodiny a zaokrouhlení
        return Math.round(diffMs / (1000 * 60 * 60));
    };

    const durationInHours = 3;
    // const durationInHours = getDurationInHours(operation.op_real_start, operation.op_real_end);

    const totalEmployeesPayments = operation.employes.map(e => Math.round(e.payment / 168)).reduce((sum, current) => sum + current, 0)
    const totalMaterialPrice = operation.materials.map(m => m.unit_price).reduce((sum, current) => sum + current, 0)
    const totalToolsPrice = operation.tools.map(t => t.unit_price).reduce((sum, current) => sum + current, 0)

    const chartData = [
        {
            "id": "Personál",
            "label": "Personál",
            "value": durationInHours * totalEmployeesPayments
        },
        {
            "id": "Materiál",
            "label": "Materiál",
            "value": totalMaterialPrice
        },
        {
            "id": "Nástroje",
            "label": "Nástroje",
            "value": totalToolsPrice
        }
    ]

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                m: 2,
                maxWidth: 800,
                mx: 'auto',
                backgroundColor: 'background.paper',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Operace: {operation.identifier}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1">
                Plánované zahájení: {operation.op_plan_start}
            </Typography>

            <Typography variant="subtitle1">
                Zahájení anestezie: {operation.an_real_start}
            </Typography>

            <Typography variant="subtitle1">
                Zahájení operace: {operation.op_real_start}
            </Typography>

            <Typography variant="subtitle1">
                Dokončení operace: {operation.op_real_end}
            </Typography>

            <Typography variant="subtitle1">
                Ukončení anestezie: {operation.an_real_end}
            </Typography>

            <Typography variant="subtitle1">
                Plánované dokončení operace: {operation.op_plan_end}
            </Typography>

            <Typography variant="subtitle1">
                Vytížení personálu: {durationInHours} h
            </Typography>

            <Divider sx={{ my: 2 }} />

            <CollapsibleDetail>
                <Typography variant="h5">
                    Personál:
                </Typography>

                <List>
                    {operation.employes.map((e) => (
                        <ListItem
                            key={e.name}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                                mb: 1,
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="subtitle1">
                                            {e.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {e.job} - {Math.round(e.payment / 168)} Kč
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>



                <Divider sx={{ my: 2 }} />

                <Typography variant="h5">
                    Materiály a nástroje:
                </Typography>

                <List>
                    {[ ...operation.materials, ...operation.tools ].map((s) => (
                        <ListItem
                            key={s.identifier}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                                mb: 1,
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="subtitle1">
                                            {s.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {s.category} - {s.unit_price} Kč
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>



                <Divider sx={{ my: 2 }} />

                <Typography variant="h5">
                    Vybavení:
                </Typography>

                <List>
                    {operation.devices.map((s) => (
                        <ListItem
                            key={s.identifier}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                                mb: 1,
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="subtitle1">
                                            {s.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {s.category} - {s.lifetime} Kč
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </CollapsibleDetail>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h5">
                Náklady:
            </Typography>

            <Typography variant="subtitle1">
                Celkem: {(durationInHours * totalEmployeesPayments) + totalMaterialPrice + totalToolsPrice} Kč
            </Typography>

            <Box sx={{ height: 400 }}>
                <PieChart data={chartData}/>
            </Box>

        </Paper>
    );
};

export default OperationDetail;