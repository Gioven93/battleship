import React from 'react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface Props{
    message:string;
}

function Toast(props:Props) {
    const {message} = props
    const colorToast:string = message === 'Hit!' ? 'bg-red-100' : message === 'Miss!' ? 'bg-yellow-100 ' : message ==='Congratulations! You sunk all the ships!' ? 'bg-green-100' : ''
    const colorText:string = message === 'Hit!' ? 'text-red-400' : message === 'Miss!' ? 'text-yellow-400' : message ==='Congratulations! You sunk all the ships!' ? 'text-green-400' : ''

  return (
      <>
          {message &&
              <div className={"rounded-md p-4 w-[480px] mb-4 " + colorToast}>
                  <div className="flex text-center">
                      <div className="ml-3">
                          <p className={"text-sm font-medium text-center " + colorText}>{message}</p>
                      </div>
                     
                  </div>
              </div>}
      </>
  
  )
}

export default Toast