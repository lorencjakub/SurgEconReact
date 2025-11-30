import { ResponsiveLine } from '@nivo/line'

const DATA = [
    {
        "id": "japan",
        "data": [
            {
                "x": "plane",
                "y": 200
            },
            {
                "x": "helicopter",
                "y": 16
            },
            {
                "x": "boat",
                "y": 174
            },
            {
                "x": "train",
                "y": 67
            },
            {
                "x": "subway",
                "y": 63
            },
            {
                "x": "bus",
                "y": 236
            },
            {
                "x": "car",
                "y": 261
            },
            {
                "x": "moto",
                "y": 252
            },
            {
                "x": "bicycle",
                "y": 62
            },
            {
                "x": "horse",
                "y": 257
            },
            {
                "x": "skateboard",
                "y": 186
            },
            {
                "x": "others",
                "y": 143
            }
        ]
    },
    {
        "id": "france",
        "data": [
            {
                "x": "plane",
                "y": 21
            },
            {
                "x": "helicopter",
                "y": 129
            },
            {
                "x": "boat",
                "y": 264
            },
            {
                "x": "train",
                "y": 97
            },
            {
                "x": "subway",
                "y": 154
            },
            {
                "x": "bus",
                "y": 33
            },
            {
                "x": "car",
                "y": 131
            },
            {
                "x": "moto",
                "y": 252
            },
            {
                "x": "bicycle",
                "y": 122
            },
            {
                "x": "horse",
                "y": 169
            },
            {
                "x": "skateboard",
                "y": 90
            },
            {
                "x": "others",
                "y": 179
            }
        ]
    },
    {
        "id": "us",
        "data": [
            {
                "x": "plane",
                "y": 194
            },
            {
                "x": "helicopter",
                "y": 288
            },
            {
                "x": "boat",
                "y": 294
            },
            {
                "x": "train",
                "y": 251
            },
            {
                "x": "subway",
                "y": 164
            },
            {
                "x": "bus",
                "y": 204
            },
            {
                "x": "car",
                "y": 84
            },
            {
                "x": "moto",
                "y": 290
            },
            {
                "x": "bicycle",
                "y": 26
            },
            {
                "x": "horse",
                "y": 210
            },
            {
                "x": "skateboard",
                "y": 134
            },
            {
                "x": "others",
                "y": 241
            }
        ]
    },
    {
        "id": "germany",
        "data": [
            {
                "x": "plane",
                "y": 249
            },
            {
                "x": "helicopter",
                "y": 220
            },
            {
                "x": "boat",
                "y": 231
            },
            {
                "x": "train",
                "y": 281
            },
            {
                "x": "subway",
                "y": 267
            },
            {
                "x": "bus",
                "y": 57
            },
            {
                "x": "car",
                "y": 150
            },
            {
                "x": "moto",
                "y": 75
            },
            {
                "x": "bicycle",
                "y": 186
            },
            {
                "x": "horse",
                "y": 161
            },
            {
                "x": "skateboard",
                "y": 115
            },
            {
                "x": "others",
                "y": 40
            }
        ]
    },
    {
        "id": "norway",
        "data": [
            {
                "x": "plane",
                "y": 40
            },
            {
                "x": "helicopter",
                "y": 241
            },
            {
                "x": "boat",
                "y": 267
            },
            {
                "x": "train",
                "y": 137
            },
            {
                "x": "subway",
                "y": 119
            },
            {
                "x": "bus",
                "y": 141
            },
            {
                "x": "car",
                "y": 212
            },
            {
                "x": "moto",
                "y": 258
            },
            {
                "x": "bicycle",
                "y": 296
            },
            {
                "x": "horse",
                "y": 47
            },
            {
                "x": "skateboard",
                "y": 254
            },
            {
                "x": "others",
                "y": 65
            }
        ]
    }
]

const LineChart = ({ data }: any) => {
    return (
        <ResponsiveLine /* or Line for fixed dimensions */
            data={DATA}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            axisBottom={{ legend: 'transportation', legendOffset: 36 }}
            axisLeft={{ legend: 'count', legendOffset: -40 }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'seriesColor' }}
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 100,
                    itemWidth: 80,
                    itemHeight: 22,
                    symbolShape: 'circle'
                }
            ]}
        />
    )
}

export default LineChart