import React from 'react'
import Button from '@mui/material/Button'

function HomePage() {
  return (
    <div className='flex justify-center items-center bg-black/70 w-full h-[100vh]'>
      <div className='bg-white/55 p-4 rounded-lg space-y-3'>
        <h1 className='text-xl'>Hellow, Wellcome to my Expense mangement Project</h1>
        <ul className=''>
          <li>Here you can maintaine you expence with money spent and description of your expence</li>
          <li>Also you can export the pdf of the you monthly expense</li>
        </ul>

        <div className='flex justify-end mt-4'>
          <Button variant="text" color="primary" onClick={() => { window.location.href = '/login'; }}>
            login
          </Button>
          <Button variant="text" color="primary" onClick={() => { window.location.href = '/register'; }}>
            Signup
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
