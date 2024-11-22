// This is evaluation form is for the Supervisor this will be used to evaluate their trainee
const questions = {
    "QUALITY OF WORK": [
      "Accuracy of the completed work",
      "Thoroughness and attention to details of the work",
      "Neatness and presentation of work"
    ],
    "PRODUCTIVITY": [
      "Effective use of time",
      "Task accomplished",
      "Prompt completion of work assignments",
      "Usefulness or effective application on knowledge"
    ],
    "WORK HABITS & SKILLS": [
      "Appropriate attire",
      "Adherence to policies and procedures",
      "Attendance and punctuality",
      "Ability to communicate well with the team",
      "Think independently",
      "Demonstrate willingness to learn the task required"
    ],
    "INTERPERSONAL WORK RELATIONSHIP": [
      "Demonstrate positive relationship with team",
      "Relates effectively with others",
      "Accepts suggestions, directions, and criticism of others",
      "Cooperative team player"
    ]
  };
  
  const ratings = [
    { value: "1", label: "Unacceptable" },
    { value: "2", label: "Needs Improvement" },
    { value: "3", label: "Satisfactory" },
    { value: "4", label: "Very Satisfactory" },
    { value: "5", label: "Outstanding" }
  ];
  
  export { questions, ratings };