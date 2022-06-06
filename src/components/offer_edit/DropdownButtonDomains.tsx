import React from "react";
import {Dropdown, DropdownButton, FormControl, InputGroup} from "react-bootstrap";
import {DomainList} from "../../utils/DomainList";

interface DropdownButtonDomainsProps {
    setDomain:(d:string)=>void;
    domain:string;
}

export const DropdownButtonDomains:React.FC<DropdownButtonDomainsProps> = (props) => {

    return ( <InputGroup>
        <DropdownButton title="Domain" variant="outline-secondary">
            {DomainList.map((domain, index) => (
                <Dropdown.Item key={index} onClick={() => props.setDomain(domain)}>
                    {domain}
                </Dropdown.Item>
            ))}
        </DropdownButton>
        <FormControl
            placeholder={props.domain}
            aria-label="Text input with dropdown button"
            disabled={true}
        />
    </InputGroup>);
}