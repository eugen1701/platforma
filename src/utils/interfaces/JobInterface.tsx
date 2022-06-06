import {CompanyProps} from "./CompanyProps";

export interface JobInterface {
    title: string;
    company?: string;
    companyId?:string;
    managerId?:string;
    domain?: string;
    description?: string;
    headMasterUrl?: string;
    salary?: string;
    location?: string;
    id?:string;
    companyObj?:CompanyProps;
}