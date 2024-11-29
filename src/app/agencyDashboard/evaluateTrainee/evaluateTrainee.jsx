import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { SupervisorQuestions, SupervisorRatings } from "@/constants/supervisorQuestions";
import trainees from '@/constants/traineeData'; 
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import RadarChartGrade from '@/components/radarChartGrade';

const SupervisorEvaluateTrainee = () => {
  const { trainee_id } = useParams();
  const [trainee, setTrainee] = useState(null);
  const [evaluation, setEvaluation] = useState({});
  const [strengths, setStrengths] = useState('');
  const [weaknesses, setWeaknesses] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const questions = SupervisorQuestions;
  const ratings = SupervisorRatings;

  useEffect(() => {
    // Fetch the trainee data based on the trainee_id
    const traineeData = trainees.find(t => t.id == trainee_id);
    setTrainee(traineeData);
  }, [trainee_id]);

  const handleRadioChange = (category, index, value) => {
    setEvaluation(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [index]: value
      }
    }));
  };

  const calculateCategoryScore = (category) => {
    const categoryScores = evaluation[category];
    if (!categoryScores) return 0;
    const totalScore = Object.values(categoryScores).reduce((acc, score) => acc + parseInt(score), 0);
    const averageScore = totalScore / Object.values(categoryScores).length;
    return averageScore * 20; // Convert to percentage
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that all questions are answered
    for (const [category, items] of Object.entries(questions)) {
      for (let i = 0; i < items.length; i++) {
        if (!evaluation[category] || !evaluation[category][i]) {
          toast({
            title: "Error",
            description: `Please answer all questions in the ${category} section.`,
            variant: "destructive",
            duration: 3000,
          });
          return;
        }
      }
    }

    // Validate that strengths, weaknesses, and comments are not empty
    if (!strengths || !weaknesses || !comments) {
      toast({
        title: "Error",
        description: "Please fill in the Strengths, Weaknesses, and Comments/Suggestions sections.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const attendance_punctuality_score = calculateCategoryScore("ATTENDANCE & PUNCTUALITY");
    const performance_score = calculateCategoryScore("PERFORMANCE");
    const general_attitude_score = calculateCategoryScore("GENERAL ATTITUDE");
    const evaluation_score = (attendance_punctuality_score + performance_score + general_attitude_score) / 3;

    console.log('Evaluation:', evaluation);
    console.log('Strengths:', strengths);
    console.log('Weaknesses:', weaknesses);
    console.log('Comments/Suggestions:', comments);
    console.log('Attendance & Punctuality Score:', attendance_punctuality_score);
    console.log('Performance Score:', performance_score);
    console.log('General Attitude Score:', general_attitude_score);
    console.log('Evaluation Score:', evaluation_score);

    setIsSubmitted(true);

    toast({
      title: "Trainee evaluated",
      description: "Trainee has successfully evaluated.",
      duration: 3000,
    });
  };

  if (!trainee) {
    return <div>Loading...</div>;
  }

  const attendance_punctuality_score = calculateCategoryScore("ATTENDANCE & PUNCTUALITY");
  const performance_score = calculateCategoryScore("PERFORMANCE");
  const general_attitude_score = calculateCategoryScore("GENERAL ATTITUDE");
  //only show 2 decimal places
  const evaluation_score = ((attendance_punctuality_score + performance_score + general_attitude_score) / 3).toFixed(2);
  return (
    <div className="w-full py-10">
      {isSubmitted && (
        <div>
          <div className='grid grid-rows-1 md:grid-cols-3 justify-items-stretch px-10 gap-10 py-2'>
            <div className='md:col-span-1'>
              <div className='h-full w-full'>
                <Card className='h-full w-full'>
                  <CardHeader>
                    <CardTitle className="text-md lg:text-lg font-semibold">{trainee.name}</CardTitle>
                    <CardTitle className="text-sm text-muted-foreground">#{trainee.studentId}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-0 space-y-4">
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Attendance & Punctuality Score:</span>
                        <span className="ml-2 font-semibold">
                          {attendance_punctuality_score.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Performance Score:</span>
                        <span className="ml-2 font-semibold">
                          {performance_score.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">General Attitude Score:</span>
                        <span className="ml-2 font-semibold">
                          {general_attitude_score.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Strengths:</span>
                        <span className="ml-2 font-semibold">
                          {strengths}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Weaknesses:</span>
                        <span className="ml-2 font-semibold">
                          {weaknesses}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Comments/Suggestions:</span>
                        <span className="ml-2 font-semibold">
                          {comments}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Evaluation Score:</span>
                        <span className="ml-2 font-semibold">
                          {evaluation_score}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className='md:col-span-2'>
              <RadarChartGrade
                attendance_punctuality_score={attendance_punctuality_score}
                performance_score={performance_score}
                general_attitude_score={general_attitude_score}
              />
            </div>
          </div>
          <div className="py-10">
            <Separator/>
          </div>
        </div>
      )}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Evaluation Form for {trainee.name}</CardTitle>
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
                  <h3 className="text-lg font-semibold bg-primary text-white p-2 rounded">{category} <span className='text-red-500'>*</span></h3>
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
                <h3 className="text-lg font-semibold bg-primary text-white p-2 rounded">STRENGTHS <span className='text-red-500'>*</span></h3>
                <Textarea
                  placeholder="Write any comments, general impressions & observation regarding the capabilities and the skills of the trainee"
                  className="min-h-[100px] max-h-[200px]"
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Maximum of 1000 characters only</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold bg-primary text-white p-2 rounded">WEAKNESSES <span className='text-red-500'>*</span></h3>
                <Textarea
                  placeholder="Write any comments, general impressions & observation regarding the capabilities and the skills of the trainee"
                  className="min-h-[100px] max-h-[200px]"
                  value={weaknesses}
                  onChange={(e) => setWeaknesses(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Maximum of 1000 characters only</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold bg-primary text-white p-2 rounded">COMMENTS/SUGGESTIONS <span className='text-red-500'>*</span></h3>
                <Textarea
                  placeholder="Write any comments, general impressions & observation regarding the capabilities and the skills of the trainee"
                  className="min-h-[100px] max-h-[200px]"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
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
}

export default SupervisorEvaluateTrainee;