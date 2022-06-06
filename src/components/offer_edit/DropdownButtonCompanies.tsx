import React from "react";
import {Dropdown, DropdownButton, FormControl, InputGroup} from "react-bootstrap";
import {CompanyProps} from "../../utils/interfaces/CompanyProps";

interface DropdownButtonCompaniesProps {
    companies:CompanyProps[]|null;
    setCompany:(c:CompanyProps) =>void;
    company:CompanyProps|null;
}
export const DropdownButtonCompanies:React.FC<DropdownButtonCompaniesProps> = (props) => {
    return (
    <InputGroup>
        <DropdownButton title="Company" variant="outline-secondary">
            {props.companies?.map((c, index) => (
                <Dropdown.Item key={index} onClick={() => props.setCompany(c)}>
                    {c.name}
                </Dropdown.Item>
            ))}
        </DropdownButton>
        <FormControl value={props.company?.name}
                     aria-label="Text input with dropdown button"
                     disabled={true}/>
    </InputGroup>
    );
}