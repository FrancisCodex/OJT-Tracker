import React from 'react';
import AgencyTraineeList from '@/components/agency_components/agencyListTrainees';
import trainees from '@/constants/traineeData';
import agencies from '@/constants/agenciesData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CompanyTrainee = () => {
  const [ourCompanyID, setOurCompanyID] = React.useState(3);
  const filteredTrainees = trainees.filter(trainee => trainee.company_id === ourCompanyID);
  const companyName = agencies.find(agency => agency.id === ourCompanyID).company_name;

  return (
    <div className='p-6 py-10'>
      <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold">
          List of all Trainee&apos;s that work in <span className='text-primary'>{companyName}</span>
        </h1>
        <Select
          value={ourCompanyID.toString()}
          onValueChange={(value) => setOurCompanyID(parseInt(value))}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Company" />
          </SelectTrigger>
          <SelectContent>
            {agencies.map((agency) => (
              <SelectItem key={agency.id} value={agency.id.toString()}>
                {agency.company_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <AgencyTraineeList data={filteredTrainees} />
      </div>
    </div>
  );
};

export default CompanyTrainee;