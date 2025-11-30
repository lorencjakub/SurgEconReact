import { ResponsiveBar } from '@nivo/bar'
import { default as DATA } from "./mock_data.json"


const BarChart = ({ data }: any) => {

    // const d = DATA.map(d => ({ [d.id]: d.value, "country": "A" }))
    const d: any = [
        {
            "elixir": 218,
            "country": "A"
        },
        {
            "elixir": 66,
            "country": "B"
        },
        {
            "elixir": 560,
            "country": "C"
        },
        {
            "elixir": 35,
            "country": "D"
        },
        {
            "elixir": 259,
            "country": "E",
            "test": 651
        }
    ]
    console.debug(d)
    return (
        <ResponsiveBar /* or Bar for fixed dimensions */
            data={d}
            keys={["elixir", "test"]}
            indexBy="country"
            labelSkipWidth={12}
            labelSkipHeight={12}
            padding={0.3}  // Přidáme padding mezi sloupci
            valueScale={{ type: 'linear' }}
            colors={{ scheme: 'nivo' }}  // Přidáme barevné schéma
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 120,
                    itemsSpacing: 3,
                    itemWidth: 100,
                    itemHeight: 16
                }
            ]}
            axisBottom={{ legend: 'country (indexBy)', legendOffset: 32 }}
            axisLeft={{ legend: 'food', legendOffset: -40 }}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        />
    )
}

export default BarChart