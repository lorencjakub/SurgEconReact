import React, { FC, Suspense, lazy } from 'react'
import {
    BrightnessHigh as LightIcon,
    BrightnessLow as DarkIcon
} from '@mui/icons-material'
import { Switch } from "@mui/material"
import { useThemeMode } from '../Providers/ThemeMode'
import {
    Box,
    Grid,
    Select,
    MenuItem
} from '@mui/material'
import { useRoutes } from 'react-router-dom'
import routes from '../../app/config/routes'
import PageHeader from '../../app/components/PageHeader'
import PageFooter from '../../app/components/PageFooter'
import { useTheme as useMuiTheme } from '@mui/material/styles'
import { useLocale } from '../Providers/Locales'
import Loading from '../components/Loading'


const NotFoundPage = lazy(() => import("../../app/pages/NotFound"))

const Page: FC<{}> = () => {
    const { themeMode, toggleThemeMode } = useThemeMode()
    const theme = useMuiTheme()
    const { locale, setLocale, getLocaleFlagUrl, allLocales } = useLocale()
    const locales = allLocales || []

    return (
        <Grid
            container
            direction="column"
            wrap="nowrap"
            data-testid="containers.layout"
            sx={{
                minHeight: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
                overflow: 'hidden'
            }}
        >
            <Suspense fallback={<Loading />}>

                {/* Header */}
                <Grid item>
                    <PageHeader
                        pageTitle="SurgEcon"
                        appBarContent={
                            <React.Fragment>
                                <Select
                                    value={locale}
                                    onChange={(e) => setLocale && setLocale(e.target.value)}
                                    name="language_select"
                                    data-testid="containers.layout.header.appbar.language_select"
                                >
                                    {locales.map((value: string) => {
                                        return (
                                            <MenuItem
                                                value={value}
                                                key={`language_option_${value}`}
                                            >
                                                <Box
                                                    data-testid="containers.layout.header.appbar.flag"
                                                    component="img"
                                                    src={getLocaleFlagUrl && getLocaleFlagUrl(value) || ""}
                                                    aria-label="logo"
                                                    sx={{
                                                        height: 24,
                                                        width: 24,
                                                        position: "relative",
                                                        top: 3
                                                    }}
                                                />
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                                <Switch
                                    data-testid="containers.layout.header.appbar.theme_mode_switcher"
                                    checked={(themeMode === "dark")}
                                    onClick={ () => {toggleThemeMode && toggleThemeMode()} }
                                    checkedIcon={<DarkIcon sx={{ bottom: 5, color: theme.palette.text.primary }} />}
                                    icon={<LightIcon sx={{ bottom: 5, color: theme.palette.text.primary }} />}
                                    sx={{
                                        height: 42
                                    }}
                                />
                            </React.Fragment>
                        }
                    />
                </Grid>

                {/* Main Content */}
                <Grid
                    item
                    xs
                    data-testid="containers.layout.content.container"
                    sx={{
                        overflow: 'auto',
                        height: 'calc(100vh - 146px)', // 100vh - (header + footer)
                        mt: '82px',
                        mb: '64px'
                    }}
                >
                    <Suspense fallback={<Loading/>}>
                        {useRoutes([...routes]) || <NotFoundPage />}
                    </Suspense>
                </Grid>

                {/* Footer */}
                <Grid item>
                    <PageFooter />
                </Grid>

            </Suspense>
        </Grid>
    )
}

export default Page