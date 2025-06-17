import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import AiTools from './_components/AiTools'
import History from './_components/History'

function Dashboard() {
    return (
        <div>
            <WelcomeBanner />
            <AiTools />
            <History />
        </div>
    )
}

export default Dashboard