import React from "react";
import {Card, Button} from "react-bootstrap";

export const Footer:React.FC = () => {
    return <Card className="text-center">
        <Card.Header>More info</Card.Header>
        <Card.Body>
            <Card.Title>Powered by Maria's NGO</Card.Title>
            <Card.Text>
                Developed with the help of her little brother
            </Card.Text>
            <Button variant="primary">Go see his amazing profile</Button>
        </Card.Body>
        <Card.Footer className="text-muted">© 2022 All rights reserved</Card.Footer>
    </Card>
}