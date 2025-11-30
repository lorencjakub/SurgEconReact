import React, { FC } from "react"
import {
    Typography,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Avatar
} from "@mui/material"
import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import {IOperation} from "../../base/utils/Axios/types";

import { default as employees } from "../components/mocks/operations_employes.json"

const getCardStyles = (state: string) => {
    switch (state) {
        case "in_use":
            return { backgroundColor: "#ffe5e5", border: "solid 3px red" }

        case "available":
            return { backgroundColor: "#d0f0c0", border: "solid 3px green" }

        case "finishing":
            return { backgroundColor: "#ffe4b5", border: "solid 3px #ff8c00" }

        default:
            return { backgroundColor: "#afdbf5", border: "solid 3px blue" }

    }
}

export interface IRoomCardProps {
    id: string,
    identifier: string,
    status: string,
    nextOperation: IOperation,
    onClick: (url: string) => void
}

function getExactRandomElements<T>(array: T[], count: number): T[] {
    if (count < 0 || count > array.length) {
        throw new Error('Neplatný počet prvků');
    }

    return [...array].sort(() => Math.random() - 0.5).slice(0, count);
}

const RoomCard: FC<IRoomCardProps> = (props) => {

    function getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const employeesCount = getRandomInt(2, 4)


    return (
        <Card
            onClick={() => props.onClick(props.id)}
            sx={{
                m: 1,
                height: 175,
                width: 160,
                cursor: "pointer",
                transition: 'transform 0.3s ease-in-out, z-index 0.3s',
                position: 'relative',
                zIndex: 1,
                '&:hover': {
                    transform: 'scale(2)',
                    zIndex: 100,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                },
                ...getCardStyles(props.status)
            }}
        >
            {
                <React.Fragment>
                    <CardHeader
                        action={
                            <Typography
                                variant="body1"
                                textAlign="center"
                                justifyContent={"center"}
                                sx={{
                                    mr: 3,
                                    mt: 0,
                                    color: "#000",
                                    fontSize: 11
                                }}
                            >
                                {props.nextOperation.op_plan_start}
                            </Typography>
                        }
                        sx={{
                            p: 1,
                            m: 0
                        }}
                    />
                    <Typography
                        variant="body2"
                        textAlign="center"
                        sx={{
                            p: 0,
                            m: 0,
                            mb: 1,
                            color: "#000"
                        }}
                    >
                        {}
                    </Typography>
                </React.Fragment>
            }
            <CardMedia
                component="img"
                sx={{
                    p: 0,
                    m: 0,
                    maxHeight: 60,
                    objectFit: "contain"
                }}
            />
            <CardContent>
                <Typography
                    variant="h1"
                    textAlign="center"
                    sx={{
                        p: 0,
                        m: 0,
                        fontSize: 11,
                        color: "#000"
                    }}
                >
                    {props.identifier}
                </Typography>
                {getExactRandomElements(employees, employeesCount).map((employee) => {
                    return (
                        <Typography
                            variant="body1"
                            textAlign="center"
                            sx={{
                                p: 0,
                                m: 0,
                                fontSize: 11,
                                color: "#000"
                            }}
                        >
                            {employee.name}
                        </Typography>
                    )
                })}

            </CardContent>
        </Card>
    )
}

export default RoomCard