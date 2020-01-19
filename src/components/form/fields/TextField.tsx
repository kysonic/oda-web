import React from 'react';
import { FormGroup, Label, Input, FormText } from 'reactstrap';
import { FieldType } from 'globals';
import { translate } from '@i18n/index';

type TextFieldPropsType = {} & FieldType;

export default function TextField({ fieldType, name, label, placeholder, value, onChange, error }: TextFieldPropsType) {
    return (
        <FormGroup className="c-text-field">
            {label && (<Label className="c-text-field__label" for={name}>{translate(label)}</Label>)}
            <Input
                id={name}
                className="c-text-field__input"
                type={fieldType}
                name={name}
                placeholder={translate(placeholder)}
                value={value}
                onChange={onChange}
                invalid={error}
            />
            {error && (<FormText className="c-text-field__error" color="danger">{error.map((message) => translate(message)).join('')}</FormText>)}
        </FormGroup>
    );
}
