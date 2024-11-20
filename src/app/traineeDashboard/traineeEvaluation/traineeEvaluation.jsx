import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import trainees from '@/constants/traineeData'; 
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { TraineeQuestions, TraineeRatings } from '@/constants/traineeQuestions';

const TraineeEvaluate = () => {
  const myTraineeID = 1;
  const [trainee, setTrainee] = useState(null);
  const [evaluation, setEvaluation] = useState({});
  const [ProblemsMet, setProblemsMet] = useState('');
  const [OtherConcerns, setOtherConcerns] = useState('');
  const { toast } = useToast();
  const questions = TraineeQuestions;
  const ratings = TraineeRatings;

  useEffect(() => {
    // Fetch the trainee data based on the trainee_id
    const traineeData = trainees.find(t => t.id == myTraineeID);
    setTrainee(traineeData);
  }, [myTraineeID]);

  const handleRadioChange = (category, index, value) => {
    setEvaluation(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [index]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Evaluation:', evaluation);
    console.log('Problems Met:', ProblemsMet);
    console.log('Other Concerns:', OtherConcerns);

    toast({
      title: "Evaluation Submitted",
      description: "Your evaluation has been successfully submitted.",
      duration: 3000,
    });
  };

  if (!trainee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Trainee Feedback Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-5 justify-items-center space-x-3 mb-4">
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
                      <RadioGroup
                        id={`${category}-${index}`}
                        className="flex"
                        value={evaluation[category]?.[index] || ''}
                        onValueChange={(value) => handleRadioChange(category, index, value)}
                      >
                        {ratings.map((rating) => (
                          <div key={rating.value} className="flex items-center">
                            <RadioGroupItem value={rating.value} id={`${category}-${index}-${rating.value}`} className="sr-only" />
                            <Label
                              htmlFor={`${category}-${index}-${rating.value}`}
                              className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 ${evaluation[category]?.[index] === rating.value ? 'bg-gray-300' : ''}`}
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
                <h3 className="text-lg font-semibold bg-green-500 text-white p-2 rounded">PROBLEMS MET</h3>
                <Textarea
                  placeholder="Write any comments, general impressions & observation regarding the capabilities and the skills of the trainee"
                  className="min-h-[100px]"
                  value={ProblemsMet}
                  onChange={(e) => setProblemsMet(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Maximum of 1000 characters only</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold bg-green-500 text-white p-2 rounded">OTHER CONCERNS</h3>
                <Textarea
                  placeholder="Write any comments, general impressions & observation regarding the capabilities and the skills of the trainee"
                  className="min-h-[100px]"
                  value={OtherConcerns}
                  onChange={(e) => setOtherConcerns(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Maximum of 1000 characters only</p>
              </div>
              <Button type="submit" className="w-full">Submit Evaluation</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TraineeEvaluate;