import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/**
 * Component to create template for forms used in other components
 * @param {Object} param0 
 * @returns JSX code for rendering a form
 */
const BaseForm = ({ title, inputs, btnText, submitCallback }) => {
  const getFormData = useCallback(() => {
    return inputs.reduce((obj, input) => {
      if (input.type === "select") {
        obj[input.name] = input.choices.length ? `${input.choices[0].id}` :
          undefined;
      }
      else {
        obj[input.name] = input.default;
      }
      return obj;
    }, {});
  }, [inputs]);

  // inputs should be array of name, label, type, default, & opt. choices
  const initFormData = getFormData();
  const [formData, setFormData] = useState(initFormData);

  /**
   * Updates form input when user types in input
   * @param {Object} evt 
   */
  const handleChange = evt => {
    const { id, value } = evt.target;
    setFormData(formData => ({ ...formData, [id]: value }));
  };

  /**
   * When user submits form, prevents page from reloading, resets form, and
   * calls submitCallback
   * @param {Object} evt
   */
  const handleSubmit = evt => {
    evt.preventDefault();
    setFormData(initFormData);
    submitCallback(formData);
  };

  // if inputs changes, updated form data
  useEffect(() => {
    const newFormData = getFormData();
    setFormData(newFormData);
  }, [inputs, getFormData]);
  
  return (
    <>
      { title && <h2>{ title }</h2> }
      <Form>
        {
          inputs.map(input => {
            if (input.type === "select") {
              return (
                <Form.Group key={ input.name } controlId={ input.name }>
                  <Form.Label>{ input.label }</Form.Label>
                  <Form.Control as="select" onChange={ handleChange } value={ formData[input.name] }>
                    {
                      input.choices.map(choice => (
                        <option key={ choice.id } value={ choice.id }>
                          { choice.name }
                        </option>
                      ))
                    }
                  </Form.Control>
                </Form.Group>
              )
            }
            return (
              <Form.Group key={ input.name } controlId={ input.name }>
                <Form.Label>{ input.label }</Form.Label>
                <Form.Control
                  type={ input.type }
                  onChange={ handleChange }
                  value={ formData[input.name] }
                />
              </Form.Group>
            )
          })
        }
      </Form>
      <Button variant="primary" onClick={ handleSubmit }>{ btnText }</Button>
    </>
  );
};

export default BaseForm;