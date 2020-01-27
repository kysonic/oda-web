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
            {Object.entries(fields).map(([key, field]: [string, FieldType]) => (
                <Field
                    className="c-form__field"
                    key={`${field.type}-${field.name}`}
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
