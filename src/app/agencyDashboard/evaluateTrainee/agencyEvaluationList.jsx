import React from 'react';
import AgencyEvaluationTable from '@/components/agency_components/agencyEvaluation_list_table';
import trainees from '@/constants/traineeData';

const AgencyEvaluationList = () => {
  const ourCompanyID = 3;

  // Filter trainees based on the company_id
  const filteredTrainees = trainees.filter(trainee => trainee.company_id === ourCompanyID);

  return (
    <div className='py-10 md:pt-0 p-3'>
      <div className='flex flex-col justify-center items-center'>
        <div className='py-3'>
          <h1 className='text-2xl font-bold'>Evaluation List</h1>
        </div>
        {/* Add table here */}
        <AgencyEvaluationTable data={filteredTrainees} />
      </div>
    </div>
  );
}

export default AgencyEvaluationList;