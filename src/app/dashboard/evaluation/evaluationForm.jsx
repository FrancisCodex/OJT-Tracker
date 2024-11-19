import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { questions, ratings } from '@/constants/evaluationQuestions'; 
import trainees from '@/constants/traineeData'; 

const Evaluation = () => {
  const { trainee_id } = useParams();
  const [trainee, setTrainee] = useState(null);
  console.log(trainee_id)

  useEffect(() => {
    // Fetch the trainee data based on the trainee_id
    const traineeData = trainees.find(t => t.id == trainee_id);
    setTrainee(traineeData);
  }, [trainee_id]);

  console.log("Trainee: ", trainee)

  if (!trainee) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Evaluation Form for {trainee.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between mb-4 ">
            {ratings.map((rating) => (
              <div key={rating.value} className="text-center flex flex-col justify-between">
                <div className='w-fit'>
                <div className="font-semibold">{rating.value}</div>
                <div className="text-sm text-muted-foreground">{rating.label}</div>
                </div>
              </div>
            ))}
          </div>

          {Object.entries(questions).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold bg-green-500 text-white p-2 rounded">{category}</h3>
              {items.map((question, index) => (
                <div key={index} className="grid grid-cols-[1fr,auto] gap-4 items-center">
                  <Label htmlFor={`${category}-${index}`} className="text-sm">
                    {index + 1}. {question}
                  </Label>
                  <RadioGroup id={`${category}-${index}`} className="flex">
                    {ratings.map((rating) => (
                      <div key={rating.value} className="flex items-center">
                        <RadioGroupItem value={rating.value} id={`${category}-${index}-${rating.value}`} className="sr-only" />
                        <Label
                          htmlFor={`${category}-${index}-${rating.value}`}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100"
                        >
                          {rating.value}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
          ))}

          <div className="space-y-2">
            <h3 className="text-lg font-semibold bg-green-500 text-white p-2 rounded">COMMENTS</h3>
            <Textarea
              placeholder="Write any comments, general impressions & observation regarding the capabilities and the skills of the trainee"
              className="min-h-[100px]"
            />
            <p className="text-sm text-muted-foreground">Maximum of 1000 characters only</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Evaluation;