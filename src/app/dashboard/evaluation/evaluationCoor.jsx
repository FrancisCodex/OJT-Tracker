import React, { useState, useEffect } from 'react';
import { Building2, Mail, Phone, GraduationCap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import trainees from '@/constants/traineeData';
import agencies from '@/constants/agenciesData';
import traineeSubmissions from '@/constants/traineeSubmissions';
import TraineeEvaluationResults from '@/constants/traineeEvaluationResults';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import RadarChartGrade from '@/components/radarChartGrade';

const EvaluationCoordinator = () => {
  const { trainee_id } = useParams();
  const [trainee, setTrainee] = useState(null);
  const [company, setCompany] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [narrativeReportScore, setNarrativeReportScore] = useState('');
  const [submittedDocumentsScore, setSubmittedDocumentsScore] = useState('');
  const [comments, setComments] = useState('');
  const [finalGrade, setFinalGrade] = useState(0);
  const { toast } = useToast();
  const companies = agencies;

  useEffect(() => {
    // Fetch the trainee data based on the trainee_id
    const traineeData = trainees.find(t => t.id == trainee_id);
    setTrainee(traineeData);

    // Fetch the company data based on the company_id
    if (traineeData) {
      const companyData = companies.find(c => c.id == traineeData.company_id);
      setCompany(companyData);
    }

    // Fetch the evaluation result based on the trainee_id
    const evaluationData = TraineeEvaluationResults.find(e => e.trainee_id == trainee_id);
    setEvaluationResult(evaluationData);
  }, [trainee_id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that all inputs are filled
    if (!narrativeReportScore || !submittedDocumentsScore) {
      toast({
        title: "Error",
        description: "Please fill in all the required fields.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Normalize the scores
    const normalizedNarrativeScore = (parseFloat(narrativeReportScore) / 100) * 100;
    const normalizedSubmittedDocumentsScore = (parseFloat(submittedDocumentsScore) / 50) * 100;

    if (normalizedNarrativeScore > 100 || normalizedSubmittedDocumentsScore > 100) {
      toast({
        title: "Error",
        description: "Please enter a valid score.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Calculate the overall grade
    const supervisorScore = evaluationResult.evaluation_score;
    const overallGrade = (supervisorScore * 0.6) + (normalizedNarrativeScore * 0.3) + (normalizedSubmittedDocumentsScore * 0.1);

    console.log('Narrative Report Score:', narrativeReportScore);
    console.log('Submitted Documents Score:', submittedDocumentsScore);
    console.log('Overall Grade:', overallGrade);

    setFinalGrade(overallGrade.toFixed(2));

    toast({
      title: "Evaluation Submitted",
      description: `The overall grade for the trainee is ${overallGrade.toFixed(2)}.`,
      duration: 3000,
    });
  };

  if (!trainee || !evaluationResult) {
    return <div>Loading...</div>;
  }

  const getTraineeDocuments = () => {
    // Find the trainee's submissions
    const traineeSubmission = traineeSubmissions.find(submission => submission.id == trainee.id);
    if (!traineeSubmission) return 0;

    // Count how many documents the trainee has submitted
    return traineeSubmission.submissions.filter(submission => submission.submitted).length;
  };

  const getInitials = (name) => {
    const namesArray = name.split(" ");
    if (namesArray.length === 1) return namesArray[0].charAt(0).toUpperCase();
    return namesArray[0].charAt(0).toUpperCase() + namesArray[1].charAt(0).toUpperCase();
  };

  const submittedDocumentsCount = getTraineeDocuments();
  const totalDocuments = 8;

  return (
    <div className='py-10 md:py-3 md:pb-10 p-3'>
      <div className="flex flex-col gap-6">
        <div className="text-start px-3 grid grid-rows-1 md:grid-cols-3 justify-items-center gap-y-6 space-y-0 py-5">
          <div className='flex'>
            <div className="row-span-2 space-y-4 gap-2">
              {/* Display avatar */}
              <div className='flex flex-row items-start gap-2'>
                <Avatar>
                  <AvatarImage src={trainee.avatar} alt={trainee.name} />
                  <AvatarFallback className='bg-accent rounded-full p-2'>{getInitials(trainee.name)}</AvatarFallback>
                </Avatar>
                <h1 className="text-md lg:text-lg font-semibold">{trainee.name}</h1>
              </div>
              <p className="text-sm text-muted-foreground">#{trainee.studentId}</p>
              <div>
                <span className="text-muted-foreground">Submitted Documents:</span>
                <span className="ml-2">{submittedDocumentsCount}/{totalDocuments}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Final Grade:</span>
                { finalGrade >= 65 ? <Badge className="ml-2">{finalGrade}</Badge> : <Badge className="ml-2" variant='destructive'>{finalGrade}</Badge> }
              </div>
            </div>
          </div>

          <div className="space-y-4 px-3">
            <div className="space-y-4 md:col-span-2">
              <h2 className="text-lg font-semibold">OJT details</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Company Name:</span>
                  <span className="ml-2">{company ? company.company_name : 'N/A'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Representative:</span>
                  <span className="ml-2">{company ? company.representative_name : 'N/A'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Date Started:</span>
                  <span className="ml-2">{trainee.date_started_ojt}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Title:</span>
                  <span className="ml-2">Intern</span>
                </div>
              </div>
            </div>
          </div>
          {/* Trainee Evaluation Score */}
          <div className="space-y-4 px-3">
            <h2 className="text-lg font-semibold">Supervisor Evaluation</h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Attendance & Punctuality Score:</span>
                <span className="ml-2 font-semibold">{evaluationResult.attendance_punctuality_score}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Performance Score:</span>
                <span className="ml-2 font-semibold">{evaluationResult.performance_score}</span>
              </div>
              <div>
                <span className="text-muted-foreground">General Attitude Score:</span>
                <span className="ml-2 font-semibold">{evaluationResult.general_attitude_score}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Evaluation Score:</span>
                <span className="ml-2 font-semibold">{evaluationResult.evaluation_score}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Coordinator Evaluation and Trainee Graph */}
        <div className='grid grid-rows-1 md:grid-cols-3 gap-5 px-3 justify-items-stretch'>
          <div className="md:col-span-1">
            <Card className='h-full'>
              <CardHeader>
                <CardTitle className="text-md text-center font-semibold">Coordinator Evaluation</CardTitle>
              </CardHeader>
              <CardContent className="pb-0 space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-evenly">
                  <div>
                    <Label htmlFor="narrativeReportScore">Narrative Report Score (out of 100) <span className='text-destructive'>*</span></Label>
                    <Input
                      id="narrativeReportScore"
                      type="number"
                      value={narrativeReportScore}
                      onChange={(e) => setNarrativeReportScore(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="submittedDocumentsScore">Submitted Documents Score (out of 50) <span className='text-destructive'>*</span></Label>
                    <Input
                      id="submittedDocumentsScore"
                      type="number"
                      value={submittedDocumentsScore}
                      onChange={(e) => setSubmittedDocumentsScore(e.target.value)}
                    />
                  </div>
                  {/* Other Comments */}
                  <div>
                    <Label htmlFor="comments">Other Concerns/Comments</Label>
                    <Textarea
                      id="comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="min-h-[150px] max-h-[175px]"
                    />
                  </div>
                  
                  <div>
                    <Button type="submit" className="w-full">Submit Evaluation</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          {/* Trainee Graph from Supervisor Evaluation */}
          <div className='md:col-span-2'>
            <RadarChartGrade
              attendance_punctuality_score={evaluationResult.attendance_punctuality_score}
              performance_score={evaluationResult.performance_score}
              general_attitude_score={evaluationResult.general_attitude_score}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationCoordinator;