'use client'

import React, { useEffect, useRef } from 'react'
import Sunburst from 'sunburst-chart'

interface SunburstData {
    name: string
    value?: number
    children?: SunburstData[]
}

interface SunburstChartProps {
    data: SunburstData
    width?: number
    height?: number
}

const SunburstChart: React.FC<SunburstChartProps> = ({ data, width = 500, height = 500 }) => {
    const chartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined' || !chartRef.current) return

        const chart = Sunburst()
        chart
            .width(width)
            .height(height)
            .data(data)
            .label('name')
            .size('value')
            .color((d: any) => {
                const colors = {
                    Director: '#FFFDE7',
                    Administration: '#C5E1A5',
                    Design: '#C5E1A5',
                    Research: '#C5E1A5',
                    Professionalization: '#C5E1A5',
                    Realization: '#C5E1A5',
                    default: '#E3F2FD'
                }
                return colors[d.name as keyof typeof colors] || colors.default
            })
            .transitionDuration(0) // Add this line to disable transitions

        chart(chartRef.current)

        return () => {
            if (chartRef.current) {
                chartRef.current.innerHTML = ''
            }
        }
    }, [data, width, height])

    return <div ref={chartRef} />
}

export default SunburstChart

