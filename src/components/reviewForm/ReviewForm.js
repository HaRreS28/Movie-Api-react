import React from "react";
import { Form, Button } from "react-bootstrap";
import AuthService from "../../api/authService";

const ReviewForm = ({ handleSubmit, revText, labelText, defaultValue }) => {
  return (
    <>
      {AuthService.getCurrentUser() ? (
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control
              ref={revText}
              as="textarea"
              rows={3}
              defaultValue={defaultValue}
            />
          </Form.Group>
          <Button variant="outline-info" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      ) : (
        <></>
      )}
    </>
  );
};

export default ReviewForm;
