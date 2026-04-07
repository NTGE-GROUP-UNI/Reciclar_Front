interface Student {
    name: string;
    class: string;
    shiftClass: string;
    presence: number;
    fouls: number;
    abandoned: number;
    frequency: number;
}

export interface CardProps {
    student: Student;
}