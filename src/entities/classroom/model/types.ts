export interface IClass {
    createdAt: string;
    name: string;
    shift: string;
    totalStudents: number;
}

export interface IClassSummary {
    classId: string;
    className: string,
    shift: string,
    totalStudents: number;
}

export interface IPostClassroom {
    name: string| undefined;
    shift: string | undefined;
}

export interface IDeleteClassroom {
    id: string | undefined;
}

export interface IFoulsMetrics {
    presences: number;
    absence: number;
    justifyed: number;
    unjustifyed: number;
}

export interface IPutClassroom {
    id: string | undefined;
    name: string | undefined;
    shift: string | undefined;
}
