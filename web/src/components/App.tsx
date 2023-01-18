import '../styles/global.css'

//Components
import { Header } from './Header'
import { SummaryTable } from './SummaryTable'

import logoImage from '../assets/logo.svg'
import { Plus } from 'phosphor-react'

export function App() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <Header />
        <SummaryTable />
      </div>

    </div>
  )
}
