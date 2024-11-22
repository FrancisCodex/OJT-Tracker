import EvaluationListTable from '@/components/coordinator_components/evaluation_list_table'
import React from 'react'
import trainees from '@/constants/traineeData'
import { Select } from '@/components/ui/select'

const EvaluationList = () => {
    const ourCompanyID = 1;
  return (
    <div className='pt-10 md:pt-0 p-3'>
        <div className='flex flex-col justify-center items-center'>
            <div className='py-3'>
                <h1 className='text-2xl font-bold'>Evaluation List</h1>
            </div>
            <EvaluationListTable data={trainees}/>
        </div>
    </div>
  )
}

export default EvaluationList