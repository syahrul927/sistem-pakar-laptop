import { ReactNode } from "react";

export interface QuestionProps {
    id: string;
    name: string;
}

export type ICustomerView = {
    id: string;
    nama: string;
    phone: string;
    email: string;
};

export type IUserViewTable = {
    no: number;
    id: string;
    nama: string;
    email: string;
    type: string;
};

export type IHistoryViewTable = {
    id: string;
    email: string;
    name: string;
    date: string;
    tools: ReactNode;
};

export type ICaseViewTable = {
    no: number;
    id: string;
    problem: string;
    solution: string;
    tools: ReactNode;
    className?: string;
};
export type ISymptomViewTable = {
    no: number;
    id: string;
    description: string;
    weight: string;
    tools: ReactNode;
};

export type ISymptomSelect = {
    id: number;
    description: string;
    weight: number;
};

export type ISelectedSymptom = {
    no: string;
    symptom: string;
};
