import React, { MouseEventHandler } from 'react'

interface Props {
    row:number,
    col:number,
    status:string,
    handleShot:(row:number, col:number) => void
}




function ShipBox(props:Props) {
    const {row,col,status, handleShot} = props
    const colorBox:string = status === 'hit' ? 'bg-red-400' : status === 'miss' ? 'bg-yellow-400' : 'bg-slate-400'
  return (
   <>
    <button onClick={() => handleShot(row, col)} key={row.toString() + col.toString()} className={"w-[40px] h-[40px] border-white m-0.5 " + colorBox}></button>
   </>
  )
}

export default ShipBox