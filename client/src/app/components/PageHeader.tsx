import React, { FC, ReactNode, useEffect } from "react"
import {
    Grid,
    AppBar,
    Typography,
    Box,
    Button
} from "@mui/material"
import { useThemeMode } from "../../base/Providers/ThemeMode"
import { useTheme as useMuiTheme } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"

const PageHeader: FC<{ pageTitle: string, appBarContent?: ReactNode }> = ({ pageTitle, appBarContent }) => {
    const { themeMode } = useThemeMode()
    const theme = useMuiTheme()
    const navigate = useNavigate()

    return (
        <React.Fragment>
            <AppBar
                position="absolute"
                sx={{ maxHeight: 82 }}
            >
                <Grid
                    container
                    columns={{ xs: 12 }}
                    alignItems="center"
                    rowSpacing={1}
                    sx={{
                        backgroundColor: "primary.dark",
                        p: 2
                    }}
                    data-testid="containers.layout.header.appbar"
                >
                    <Grid item xs={1}>
                        <Box
                            data-testid="containers.layout.header.appbar.logo"
                            component="img"
                            src="/ant-icon.svg"
                            aria-label="logo"
                            sx={{
                                ml: 2,
                                mt: 0.5,
                                height: 42,
                                width: 42
                            }}
                            style={{
                                cursor: "pointer",
                                filter: (themeMode !== "dark") ? undefined :
                                    "invert(46%) sepia(47%) saturate(3150%) hue-rotate(338deg) brightness(101%) contrast(110%)"
                            }}
                            onClick={() => navigate("/")}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={9}
                        container
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item>
                            <Typography
                                variant="h4"
                                color="text.primary"
                                noWrap
                                onClick={() => navigate("/")}
                                style={{ cursor: "pointer" }}
                            >
                                {pageTitle}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/metrics")}
                                sx={{
                                    backgroundColor: "primary.main",
                                    color: "text.primary",
                                    '&:hover': {
                                        backgroundColor: "primary.light"
                                    }
                                }}
                                data-testid="containers.layout.header.metrics-button"
                            >
                                Metrics
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        justifyContent="flex-end"
                        alignItems="center"
                        style={{
                            display: 'flex',
                            overflow: 'hidden',
                            flexDirection: "row"
                        }}
                        data-testid="containers.layout.header.appbar.tools"
                    >
                        {appBarContent}
                    </Grid>
                </Grid>
            </AppBar>
            <div style={{ alignItems: 'center', minHeight: 82 }} />
        </React.Fragment>
    )
}

export default PageHeader