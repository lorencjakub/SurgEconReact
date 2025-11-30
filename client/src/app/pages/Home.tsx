import React, { FC } from 'react'
import {
    Button,
    Paper,
    Grid,
    Typography
} from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useTheme as useMuiTheme } from "@mui/material/styles"
import { useIntl } from "react-intl"
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Loading from '../../base/components/Loading'
import backendServices from "../../base/utils/Axios/ApiClient";
import {IOperation, IRoomRow} from "../../base/utils/Axios/types";
import RoomCard from "../components/RoomCard";
import { default as rooms } from "../components/mocks/rooms.json"


const HomePage: FC<{}> = () => {
    const navigate = useNavigate()
    const theme = useMuiTheme()
    const intl = useIntl()

    const randomBool = (): boolean => {
        return Math.random() < 0.4;
    }

    return (
        <Paper
            elevation={0}
            style={{
                display: 'flex',
                flexDirection: "row",
                overflow: 'hidden',
                minHeight: 310
            }}
            sx={{
                px: 5,
                py: 2,
                m: 1,
                width: "100%",
                height: "100%",
                backgroundColor: "background.default",
                borderRadius: 5
            }}
        >
            <Grid
                data-testid="pages.homepage.container"
                container
                direction="column"
                spacing={1}
                justifyContent="center"
                alignItems="center"
                sx={{
                    display: 'flex',
                    overflow: "auto"
                }}
            >
                <Grid
                    data-testid="pages.homepage.title"
                    item
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Typography
                        variant="h6"
                        color="text.primary"
                    >
                        {intl.formatMessage({ id: "pages.homepage.title", defaultMessage: "Welcome!" })}
                    </Typography>
                </Grid>
                <Grid
                    data-testid="pages.homepage.about"
                    container
                    justifyContent="center"
                >
                    {rooms.map(r => {
                        return (
                            <RoomCard
                                id={r.id}
                                identifier={r.room.identifier}
                                status={randomBool() ? "available" : randomBool() ? "finishing" : "in_use"}
                                onClick={(id: string) => navigate(`rooms/${id}`)}
                                key={r.id}
                                nextOperation={[...r.operations].sort((a, b) =>
                                    new Date(b.op_plan_start).getTime() - new Date(a.op_plan_start).getTime()
                                )[0]}
                            />
                    )})}
                </Grid>
            </Grid>
        </Paper>
    )
}

export default HomePage