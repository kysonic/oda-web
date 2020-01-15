import React from 'react';
import { Form, Button } from 'reactstrap';
import { capitalizeFirst } from '@utils/string';
import { FieldType } from 'globals';
import useFrom from '@components/hooks/useForm';
import Fields from './fields';

type FieldPropsType = {} & FieldType;

export function Field(props: FieldPropsType) {
    const FieldComponent = Fields[`${capitalizeFirst(props.type)}Field`];

    return (
        <FieldComponent {...props} />
    );
}

export type FormPropsType = {
    fields: {
        [key: string]: FieldType;
    };
}

export default function FormFactory({ fields }: FormPropsType) {
    const [formData, onChange, onSubmit] = useFrom(fields, () => {
        console.log('Submit!');
    });
    console.log(formData);
    return (
        <Form onSubmit={onSubmit}>
            {Object.entries(fields).map(([key, field]) => (
                <Field
                    key={`${field.type}-${field.name}`}
                    value={formData[field.name].value}
                    onChange={onChange}
                    {...field}
                />
            ))}
            <Button>Submit</Button>
        </Form>
    );
}
