import React from 'react';
import { FormGroup, Label, Input, FormText } from 'reactstrap';
import { FieldType } from 'globals';
import { translate } from '@i18n/index';

type CheckboxFieldPropsType = {} & FieldType;

export default function CheckboxField({ name, label, value = false, onChange, error, attrs = {} }: CheckboxFieldPropsType) {
    return (
        <FormGroup className="c-checkbox-field">
            <div className="c-checkbox-field__wrapper custom-control custom-checkbox">
                <Input
                    className="c-checkbox-field__input custom-control-input"
                    name={name}
                    id={name}
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    {...attrs}
                />
                {label && <Label className="c-checkbox-field__label custom-control-label" htmlFor={name}>{translate(label)}</Label>}
            </div>
            {error && (<FormText className="c-checkbox-field__error" color="danger">{error.map((message) => translate(message)).join('')}</FormText>)}
        </FormGroup>
    );
}
