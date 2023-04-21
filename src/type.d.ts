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
    id: string;
    nama: string;
    email: string;
    type: string;
};

export type ICaseViewTable = {
    id: string;
    problem: string;
    solution: string;
    tools: ReactNode;
};

export type ISymptomSelect = {
    id: number;
    description: string;
    weight: number;
};
