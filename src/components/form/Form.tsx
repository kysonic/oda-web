import React, { RefObject } from 'react';
import { Form, Button } from 'reactstrap';
import { capitalizeFirst } from '@utils/string';
import { FieldType, FieldsType } from 'globals';
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
    fields: FieldsType;
    onSubmit?: Function;
    ref?: RefObject<HTMLElement>;
}

export default function FormFactory({ fields, ref, onSubmit = () => {} }: FormPropsType) {
    const [formData, onChange, handleSubmit, errors] = useFrom(fields, onSubmit);

    return (
        <Form innerRef={ref} className="c-form" onSubmit={handleSubmit}>
            {Object.entries(fields).map(([key, field]: [string, FieldType]) => (
                <Field
                    className="c-form__field"
                    key={`${field.type}-${field.name}`}
                    value={formData[field.name].value}
                    error={errors[field.name]}
                    onChange={onChange}
                    {...field}
                />
            ))}
            <Button className="c-form__submit">Submit</Button>
        </Form>
    );
}
