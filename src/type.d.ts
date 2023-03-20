export interface QuestionProps {
    id: string;
    question: string;
    type: "SELECT" | "OPTION";
    response: string[];
}

export type ICustomerView = {
    id: string;
    nama: string;
    phone: string;
    email: string;
};
