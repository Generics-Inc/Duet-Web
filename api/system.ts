type DefaultApiStructForMethod = {
    response: any;
    params?: { [name: string]: APIParameter; };
    query?: Partial<{ [name: string]: APIQuery; }>;
};
type DefaultApiStructForMethodWithBody = {
    body?: { [name: string]: any; };
};

export type APIStruct = {
    GET?: { [name: string]: DefaultApiStructForMethod; };
    POST?: { [name: string]: DefaultApiStructForMethod & DefaultApiStructForMethodWithBody; };
    PUT?: { [name: string]: DefaultApiStructForMethod & DefaultApiStructForMethodWithBody; };
    PATCH?: { [name: string]: DefaultApiStructForMethod & DefaultApiStructForMethodWithBody; };
    DELETE?: { [name: string]: DefaultApiStructForMethod; };
};

export type APIQuery = string | number;
export type APIParameter = string | number;
export type APIEmpty = {};
export type APIPagination<T> = {
    count: number;
    results: T[];
};
