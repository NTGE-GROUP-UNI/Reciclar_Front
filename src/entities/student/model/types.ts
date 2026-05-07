export interface IPostStudent {
    className: string | undefined;
    expirationYear: string | undefined;
    fullName: string | undefined;
    shift: string | undefined;
}

export interface IPutStudent {
    id: string | undefined;
    className: string | undefined;
    expirationYear: string | undefined;
    fullName: string | undefined;
    shift: string | undefined;
}

export interface IStudent {
    id: string;
    fullName: string;
    className: string
    expirationYear: number,
    createdAt: string,
    updatedAt: string,
    status: string,
    absences: number
    shift: string;
    presences: number;
    frequency: string;
    justified: number;
    qrcodeId: string;
}

export interface IPatchStudent {
    id: string | undefined;
    status: string | undefined;
}