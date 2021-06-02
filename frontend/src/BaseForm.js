import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/**
 * Component to create template for forms used in other components
 * @param {Object} param0 
 * @returns JSX code for rendering a form
 */
const BaseForm = ({ inputs, cancel, btnText, submitCallback }) => {
  // inputs should be array of name, label, type, default, & opt. choices
  const initFormData = inputs.reduce((obj, input) => {
    obj[input.name] = input.default;
    return obj;
  }, {});
  const [formData, setFormData] = useState(initFormData);

  const handleChange = evt => {
    const { id, value } = evt.target;
    setFormData(formData => ({ ...formData, [id]: value }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    setFormData(initFormData);
    submitCallback(formData);
  };

  const handleCancel = evt => {
    evt.preventDefault();
    cancel.callback();
  };
  
  return (
    <>
      <Form>
        {
          inputs.map(input => (
            <Form.Group key={ input.name } controlId={ input.name }>
              <Form.Label>{ input.label }</Form.Label>
              <Form.Control type={ input.type } onChange={ handleChange } value={ formData[input.name] } />
            </Form.Group>
          ))
        }
      </Form>
      {
        cancel && (
          <Button variant="secondary" onClick={ handleCancel }>
            { cancel.text }
          </Button>
        )
      }
      <Button variant="primary" onClick={ handleSubmit }>{ btnText }</Button>
    </>
  );
};

export default BaseForm;