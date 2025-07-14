import LayoutHeaderText from '@/components/layout-header-text'
import React from 'react'

const page = () => {
  return (
    <div className='h-full w-full bg-amber-200'>
      <LayoutHeaderText />

      <section className='flex flex-col items-center justify-start'>
        <h2>In progress <span>2</span></h2>

        <div className='flex items-center justify-start'>
          <h1>Something new</h1> <div>hight priority</div>
          <div>
            <div>overdue: 2025/05/25 18.00</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page