import React, {useState} from "react";
import {Card} from "react-bootstrap";

export const Signup: React.FC = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    function renderFormPage() {

    }
  return (
    <Card className="border-5 shadow bg-light" id="card">
        <div className="p-5 m-auto rounded-lg">

        </div>
    </Card>
  );
};