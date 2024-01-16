import React from 'react'
import Data from '../Data/Data'
import InputSection from './InputSection'

const HomePage: React.FC = () => {
  return (
    <div>
       <InputSection data={Data}/>
    </div>
  )
}

export default HomePage