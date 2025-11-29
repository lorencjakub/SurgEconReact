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
import { useQuery, useQueryClient } from '@tanstack/react-query'
import backendServices from '../../base/utils/Axios/ApiClient'
import {IRoomRow} from '../../base/utils/Axios/types'
import RoomCard from '../components/RoomCard'
import { AxiosError } from 'axios'
import Loading from '../../base/components/Loading'


const HomePage: FC = () => {
    const navigate = useNavigate()
    const theme = useMuiTheme()
    const intl = useIntl()
    const queryClient = useQueryClient()

    const dashboardRooms = useQuery<IRoomRow[], AxiosError>(
        {
            queryKey: ["rooms-list-query"],
            queryFn: backendServices.getAllRooms,
            enabled: true,
            initialData: [],
            placeholderData: []
            // meta: {
            //     onSuccess: (res) => {
            //         // sessionStorage.setItem("Token", res.token)
            //         // setPlayerCards(res.cards)
            //         // navigate(`/rooms/${res.room}`)
            //     }
            // }
        }, queryClient
    )

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
                    overflow: "auto",
                    height: "100%"
                }}
            >
                <Grid
                    data-testid="pages.homepage.title"
                    container
                    direction={"row"}
                    sx={{
                        justifyContent: "center",
                        height: "100vh"
                    }}
                >
                    <Typography
                        variant="h6"
                        color="text.primary"
                    >
                        {intl.formatMessage({ id: "pages.homepage.title", defaultMessage: "Real-time usage of operations rooms" })}
                    </Typography>

                    <Grid
                        container
                        spacing={5}
                        direction={"row"}
                        data-testid="pages.homepage.about"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {
                            dashboardRooms.data?.length == 0
                                ?
                                <Typography
                                    variant="h6"
                                    color="text.primary"
                                >
                                    {intl.formatMessage({ id: "pages.homepage.title", defaultMessage: "Welcome!" })}
                                </Typography>
                                :
                                dashboardRooms.data?.map(r => <RoomCard {...r ?? {}} onClick={(id: string) => navigate(`/rooms/${id}`)} key={r?.id} />)
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default HomePage