import React, { RefObject } from 'react';
import { Form, Button } from 'reactstrap';
import { capitalizeFirst } from '@utils/string';
import { FieldType, FieldsType, ClassNameType } from 'globals';
import * as classNames from 'classnames';
import useFrom from '@components/hooks/useForm';
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
    fields: FieldsType;
    onSubmit?: Function;
    submitProps?: {
        caption?: string;
        className?: string;
    };
    ref?: RefObject<HTMLElement>;
} & ClassNameType;

export default function FormFactory({ fields, ref, onSubmit = () => {}, submitProps = { caption: 'SUBMIT', className: '' }, className }: FormPropsType) {
    const [formData, onChange, handleSubmit, errors] = useFrom(fields, onSubmit);

    return (
        <Form innerRef={ref} className={classNames('c-form', className)} onSubmit={handleSubmit}>
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
            <Button className={classNames('c-form__submit', submitProps.className)}>{translate(submitProps?.caption)}</Button>
        </Form>
    );
}
