import React, { useState, useEffect } from 'react';
import { Building2, Mail, Phone, GraduationCap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import trainees from '@/constants/traineeData';
import agencies from '@/constants/agenciesData';
import TraineeEvaluationResults from '@/constants/traineeEvaluationResults';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const EvaluationCoordinator = () => {
  const { trainee_id } = useParams();
  const [trainee, setTrainee] = useState(null);
  const [company, setCompany] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [narrativeReportScore, setNarrativeReportScore] = useState('');
  const [submittedDocumentsScore, setSubmittedDocumentsScore] = useState('');
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

    // Calculate the overall grade
    const supervisorScore = evaluationResult.evaluation_score;
    const overallGrade = (supervisorScore * 0.6) + (normalizedNarrativeScore * 0.3) + (normalizedSubmittedDocumentsScore * 0.1);

    console.log('Narrative Report Score:', narrativeReportScore);
    console.log('Submitted Documents Score:', submittedDocumentsScore);
    console.log('Overall Grade:', overallGrade);

    toast({
      title: "Evaluation Submitted",
      description: `The overall grade for the trainee is ${overallGrade.toFixed(2)}.`,
      duration: 3000,
    });
  };

  if (!trainee || !evaluationResult) {
    return <div>Loading...</div>;
  }

  return (
    <div className='py-10 md:py-3 md:pb-10 p-3'>
            <div className="grid lg:grid-cols-[300px,1fr] gap-6">
      <div className="text-start px-3 md:grid md:grid-cols-3 md:gap-y-6 md:gap-x-4 lg:block md:space-y-0 lg:space-y-6 w-fit">
        <div className="row-span-2 flex items-start gap-2">
          <div className='w-fit'>
            <h1 className="text-md lg:text-lg font-semibold">{trainee.name}</h1>
            <p className="text-sm text-muted-foreground">#{trainee.studentId}</p>
          </div>
        </div>

        <div className="space-y-4">
        <h2 className="text-md font-semibold">Supervisor's Evaluation</h2>
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <span className="text-muted-foreground">Evaluation Score:</span>
              <span className="ml-2">{evaluationResult.evaluation_score}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Strengths:</span>
              <span className="ml-2">{evaluationResult.strengths}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Weaknesses:</span>
              <span className="ml-2">{evaluationResult.weaknesses}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Other Comments:</span>
              <span className="ml-2">{evaluationResult.other_comments}</span>
            </div>
            <div>
                <span className="text-muted-foreground">Evaluator:</span>
                <span className="ml-2">{evaluationResult.representative_name}</span>
            </div>
          </CardContent>
        </Card>
        </div>

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
      <div className="space-y-6">
        <h2 className="text-md font-semibold">Coordinator's Evaluation</h2>
        <Card>
          <CardContent className="p-4 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="narrativeReportScore">Narrative Report Score (out of 100)</Label>
                <Input
                  id="narrativeReportScore"
                  type="number"
                  value={narrativeReportScore}
                  onChange={(e) => setNarrativeReportScore(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="submittedDocumentsScore">Submitted Documents Score (out of 50)</Label>
                <Input
                  id="submittedDocumentsScore"
                  type="number"
                  value={submittedDocumentsScore}
                  onChange={(e) => setSubmittedDocumentsScore(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Submit Evaluation</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default EvaluationCoordinator;