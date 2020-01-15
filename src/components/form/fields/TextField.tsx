import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { FieldType } from 'globals';

type TextFieldPropsType = {} & FieldType;

export default function TextField({ fieldType, name, label, placeholder, value, onChange }: TextFieldPropsType) {
    return (
        <FormGroup>
            {label && (<Label for={name}>Email</Label>)}
            <Input
                id={name}
                type={fieldType}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </FormGroup>
    );
}
