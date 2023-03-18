export interface QuestionProps {
  id: string;
  question: string;
  type: "SELECT" | "OPTION";
  response: string[];
}
