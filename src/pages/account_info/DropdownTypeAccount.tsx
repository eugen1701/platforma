import React from "react";
import { DropdownButton, FormControl, InputGroup } from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

const types = ["employers", "normal"];

interface DropdownTypeAccountProps {
  userType: string;
  setUserType: (s: string) => void;
  editMode:boolean;
}

export const DropdownTypeAccount: React.FC<DropdownTypeAccountProps> = (
  props
) => {
  return (
    <InputGroup>
      <DropdownButton title="User type" variant="outline-secondary" disabled={!props.editMode}>
        {types.map((type, index) => (
          <DropdownItem key={index} onClick={() => props.setUserType(type)} value={props.userType}>
            {type}
          </DropdownItem>
        ))}
      </DropdownButton>
      <FormControl
        value={props.userType}
        aria-label="Text input with dropdown button"
        disabled={true}
        title="User type"
      />
    </InputGroup>
  );
};