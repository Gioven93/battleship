import React from 'react'
import GameBoard from './Components/GameBoard/GameBoard'


function MainComponent() {
    return (
        <>
            <main className="-mt-24 pb-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    {/* Main 4 column grid */}
                    <div className="bg-white rounded-md p-5 grid grid-cols-6 gap-4 lg:grid-cols-6 lg:gap-4">
                        <div className="bg-white grid grid-cols-subgrid gap-4 col-span-6">
                           <GameBoard/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default MainComponent