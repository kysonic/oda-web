import React from 'react';
import { FormGroup, Label, Input, FormText } from 'reactstrap';
import { FieldType } from 'globals';

type TextFieldPropsType = {} & FieldType;

export default function TextField({ fieldType, name, label, placeholder, value, onChange, error }: TextFieldPropsType) {
    return (
        <FormGroup className="c-text-field">
            {label && (<Label className="c-text-field__label" for={name}>Email</Label>)}
            <Input
                id={name}
                className="c-text-field__input"
                type={fieldType}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                invalid={error}
            />
            {error && (<FormText className="c-text-field__error" color="danger">{error.join('')}</FormText>)}
        </FormGroup>
    );
}
