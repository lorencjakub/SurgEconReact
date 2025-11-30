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
import { default as roomData } from '../components/mocks/room2.json';


const RoomDetail: FC = () => {
    const navigate = useNavigate();

    const sortedOperations = [...roomData.operations].sort((a, b) =>
        new Date(b.op_plan_start).getTime() - new Date(a.op_plan_start).getTime()
    );

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
                Místnost: {roomData.room.identifier}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <List>
                {sortedOperations.map((operation) => (
                    <ListItem
                        key={operation.id}
                        onClick={() => navigate(`/operations/${operation.id}`)}
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
                                        {operation.identifier}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(operation.op_plan_start).toLocaleString('cs-CZ')}
                                        {' - '}
                                        {new Date(operation.op_plan_end).toLocaleString('cs-CZ')}
                                    </Typography>
                                </Box>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default RoomDetail;