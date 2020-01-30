import React, { RefObject } from 'react';
import { Form, Button } from 'reactstrap';
import { capitalizeFirst } from '@utils/string';
import { FieldType, FieldsType, ClassNameType, useCallbackType } from 'globals';
import * as classNames from 'classnames';
import { translate } from '@i18n/index';
import Fields from './fields';

type FieldPropsType = {} & FieldType;

export function Field(props: FieldPropsType) {
    const FieldComponent = Fields[`${capitalizeFirst(props.type)}Field`];

    return (
        <FieldComponent {...props} />
    );
}

export type FormPropsType = {
    formData: FieldsType;
    handleSubmit: useCallbackType;
    onChange: useCallbackType;
    fields: FieldsType;
    submitProps?: {
        caption?: string;
        className?: string;
    };
    ref?: RefObject<HTMLElement>;
} & ClassNameType;

/**
 * Form Factory ties with useForm hooks, all hook handlers should be passed as props
 * @param formData - useForm prop
 * @param handleSubmit  - useForm prop
 * @param onChange  - useForm prop
 * @param errors - useForm prop
 * @param fields - form fields, same as for useForm
 * @param ref - forwarded ref
 * @param submitProps - submit button cusomizations
 * @param className - classes
 * @constructor
 */

export default function FormFactory({
    formData,
    handleSubmit,
    onChange,
    errors,
    fields,
    ref,
    submitProps = { caption: 'SUBMIT', className: '' },
    className,
}: FormPropsType) {
    return (
        <Form innerRef={ref} className={classNames('c-form', className)} onSubmit={handleSubmit}>
            {errors.common && (<div className="c-form__error text-center mb-2 cl-danger">{translate(errors.common)}</div>)}
            {Object.entries(fields).map(([key, field]: [string, FieldType], index) => (
                <Field
                    className="c-form__field"
                    key={`${field.type}-${field.name}-${index}`}
                    defaultValue={fields[field.name].value}
                    value={formData[field.name]?.value}
                    error={errors[field.name]}
                    onChange={onChange}
                    {...field}
                />
            ))}
            <Button className={classNames('c-form__submit', submitProps.className)}>{translate(submitProps?.caption)}</Button>
        </Form>
    );
}
