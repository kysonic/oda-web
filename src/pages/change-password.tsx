import React, { useCallback, useState } from 'react';
import {
    FormGroup,
    Form,
    Input,
    InputGroup,
    Button,
    Row,
    Col,
    Container,
} from 'reactstrap';

const initialFormState = {
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

const ChangePasswordForm = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const onChange = useCallback((key) => (event) => {
        setFormData({
            ...formData,
            [key]: {
                ...formData[key],
                value: event.target.value,
            },
        });
    }, [formData]);
    const onSubmit = useCallback(() => {
        // TODO Submit
    }, [formData]);
    return (
        <Form>
            {Object.entries(formData).map(([prop, data]) => (
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <InputGroup className="input-group-alternative mb-4">
                                <Input
                                    value={data.value}
                                    type={passwordVisibility ? 'text' : 'password'}
                                    placeholder={data.placeholder}
                                    onChange={onChange(prop)}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            ))}
            <Row>
                <Button onClick={onSubmit} color="primary" type="button">
                    Change password
                </Button>
            </Row>
        </Form>
    );
};

const ChangePasswordView = () => (
    <Container className="container" fluid="lg">
        <ChangePasswordForm />
    </Container>
);

export default ChangePasswordView;
