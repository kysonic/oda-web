import React from 'react';
import { FormGroup, Label, Input, InputGroup, InputGroupText, InputGroupAddon, FormText } from 'reactstrap';
import { FieldType } from 'globals';
import { translate } from '@i18n/index';
import * as classNames from 'classnames';

type TextFieldPropsType = {} & FieldType;

export default function TextField({ fieldType, name, label, placeholder, value, onChange, error, className, icon }: TextFieldPropsType) {
    return (
        <FormGroup className="c-text-field">
            {label && (<Label className="c-text-field__label" for={name}>{translate(label)}</Label>)}
            <InputGroup className={classNames('c-text-field__input-group', className)}>
                {icon && (
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className={`ni ni-${icon}`} />
                        </InputGroupText>
                    </InputGroupAddon>
                )}
                <Input
                    id={name}
                    className={classNames('c-text-field__input', className)}
                    type={fieldType}
                    name={name}
                    placeholder={translate(placeholder)}
                    value={value}
                    onChange={onChange}
                    invalid={error}
                />
            </InputGroup>
            {error && (<FormText className="c-text-field__error" color="danger">{error.map((message) => translate(message)).join('')}</FormText>)}
        </FormGroup>
    );
}
