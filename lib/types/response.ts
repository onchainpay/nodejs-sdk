interface ISuccessResult<RES> {
    success: true;
    response: RES;
}
interface IFailResult {
    success: false;
    error: {
        code: number;
        name: string;
        message: string;
    };
    requestId?: string;
}

export type OCPResponse<RES> = Promise<ISuccessResult<RES> | IFailResult>;
