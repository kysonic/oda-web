import React from 'react';
import { Form, Button } from 'reactstrap';
import { capitalizeFirst } from '@utils/string';
import { FieldType, FieldsType, ClassNameType } from 'globals';
import * as classNames from 'classnames';
import { translate } from '@i18n/index';
import useFrom from '@hooks/useForm';
import Fields from './fields';

type FieldPropsType = {} & FieldType;

export function Field(props: FieldPropsType) {
    const FieldComponent = Fields[`${capitalizeFirst(props.type)}Field`];

    return (
        <FieldComponent {...props} />
    );
}

export type ErrorsType = {
    [key: string]: string;
}

export type FormPropsType = {
    fields: FieldsType;
    submitButtonProps?: {
        caption?: string;
        className?: string;
    };
    extraErrors?: ErrorsType;
} & ClassNameType;


export default function FormFactory({ className, fields, submitButtonProps = { caption: 'SUBMIT', className: '' }, onSubmit, extraErrors }: FormPropsType) {
    const { className: submitButtonClassName, caption: submitButtonCaption } = submitButtonProps;
    const { formData, handleChange, handleSubmit, errors } = useFrom(fields, onSubmit);
    const formErrors = { ...errors, ...extraErrors };

    return (
        <Form className={classNames('c-form', className)} onSubmit={handleSubmit}>
            {formErrors.common && (<div className="c-form__error text-center mb-2 cl-danger">{translate(formErrors.common)}</div>)}
            {Object.entries(fields).map(([key, field]: [string, FieldType], index) => (
                <Field
                    className="c-form__field"
                    key={`${field.type}-${field.name}-${index}`}
                    defaultValue={fields[field.name]?.value}
                    value={formData[field.name]?.value}
                    error={formErrors[field.name]}
                    onChange={handleChange}
                    {...field}
                />
            ))}
            <Button className={classNames('c-form__submit', submitButtonClassName)}>{translate(submitButtonCaption)}</Button>
        </Form>
    );
}
