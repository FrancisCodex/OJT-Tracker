import ListTable from '@/components/list-table'
import React from 'react'
import trainees from '@/constants/traineeData'

const AllTrainees = () => {


  return (
    <div className='p-6'>
      <h1 className="text-2xl font-bold">LIST OF ALL TRAINEE&apos;S</h1>
        <div>
            <ListTable data={trainees}/>
        </div>
    </div>
  )
}

export default AllTrainees