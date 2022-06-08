import React, {FormEvent} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Attachment} from "../../svg/Attachment";

interface MessageFormProps {
    handleSubmit: (e:FormEvent<HTMLFormElement>) => void;
    text:string;
    setText: (par:string) =>void;
    setFile:(file:File) =>void;
}

export const MessageForm:React.FC<MessageFormProps> = (props) => {
    return (<Form onSubmit={props.handleSubmit}>
        <FormGroup>
            <div className="d-flex justify-content-center"><FormLabel htmlFor="img"><Attachment/></FormLabel>
                <input type="file" id="img" accept="*" style={{display: "none"}} onChange={e => props.setFile(e.target.files![0])}/>
                <div>
                    <FormControl placeholder="Enter message" style={{width: "600px"}} value={props.text} onChange={e => props.setText(e.target.value)}/>
                </div>
                <div>
                    <Button type="submit">Send</Button>
                </div>
            </div>
        </FormGroup>
    </Form>);
}