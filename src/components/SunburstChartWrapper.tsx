'use client'

import dynamic from 'next/dynamic'

const SunburstChart = dynamic(() => import('@/components/SunBurstChart'), {
    ssr: false,
    loading: () => <div>Loading chart...</div>
})

export default SunburstChart

