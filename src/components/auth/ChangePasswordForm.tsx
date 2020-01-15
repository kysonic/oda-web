import React, { useCallback } from 'react';
import {
    FormGroup,
    Form,
    Input,
    InputGroup,
    Button,
    Row,
    Col,
} from 'reactstrap';
import useForm, { formConfigType } from './useForm';

const initialFormState: formConfig = {
    password: {
        value: '',
        validateErrors: {},
        type: 'password',
        placeholder: 'Enter your password',
    },
    confirm: {
        value: '',
        validateErrors: {},
        type: 'password',
        placeholder: 'Confirm your password',
    },
};

export default function ChangePasswordForm() {
    const [formData, onChange]: [formConfigType, fn] = useForm(initialFormState);
    const onSubmit = useCallback((e) => {
        // submit
    }, [formData]);

    return (
        <Form>
            {Object.entries(formData).map(([name, data]) => (
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <InputGroup className="input-group-alternative mb-4">
                                <Input
                                    name={name}
                                    value={data.value}
                                    type={data.type}
                                    placeholder={data.placeholder}
                                    onChange={onChange}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            ))}
            <Row>
                <Col md="12">
                    <Button onClick={onSubmit} color="primary" type="button">
                        Change password
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
