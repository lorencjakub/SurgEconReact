// Home.tsx
import React, { FC } from 'react'
import {
    Paper,
    Grid,
    Typography,
    Box
} from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useIntl } from "react-intl"
import RoomCard from "../components/RoomCard"
import { default as rooms } from "../components/mocks/rooms.json"

const HomePage: FC = () => {
    const navigate = useNavigate()
    const intl = useIntl()

    const randomBool = (): boolean => {
        return Math.random() < 0.4
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                overflow: 'auto',
                px: { xs: 2, sm: 3, md: 5 },
                pb: 2
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    backgroundColor: "background.default",
                    borderRadius: 5,
                    p: 3,
                    height: '100%'
                }}
            >
                <Grid
                    container
                    direction="column"
                    spacing={3}
                >
                    <Grid item>
                        <Typography
                            variant="h6"
                            color="text.primary"
                            align="center"
                            gutterBottom
                        >
                            {intl.formatMessage({ id: "pages.homepage.title", defaultMessage: "Welcome!" })}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Grid
                            container
                            spacing={2}
                            justifyContent="center"
                        >
                            {rooms.map(r => (
                                <Grid
                                    item
                                    key={r.id}
                                    xs={12}
                                    sm={3}
                                    md={2}
                                    lg={2}
                                >
                                    <RoomCard
                                        id={r.id}
                                        identifier={r.room.identifier}
                                        status={randomBool() ? "available" : randomBool() ? "finishing" : "in_use"}
                                        onClick={(id: string) => navigate(`rooms/${id}`)}
                                        nextOperation={[...r.operations].sort((a, b) =>
                                            new Date(b.op_plan_start).getTime() - new Date(a.op_plan_start).getTime()
                                        )[0]}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default HomePage