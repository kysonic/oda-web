import React, { useState } from 'react';
import { FormGroup, Label, Input, InputGroup, InputGroupText, InputGroupAddon, FormText } from 'reactstrap';
import { FieldType } from 'globals';
import { translate } from '@i18n/index';
import * as classNames from 'classnames';

type TextFieldPropsType = {} & FieldType;

export default function TextField({ fieldType, name, label, placeholder, value = '', defaultValue, onChange, error, className, icon, attrs = {} }: TextFieldPropsType) {
    const [focused, setFocused] = useState(false);

    return (
        <FormGroup className={classNames('c-text-field', { focused })}>
            {label && (<Label className="c-text-field__label" for={name}>{translate(label)}</Label>)}
            <InputGroup className={classNames('c-text-field__input-group', className)}>
                {icon && (
                    <InputGroupAddon className="c-text-field__addon" addonType="prepend">
                        <InputGroupText className={classNames('c-text-field__group-text', { 'is-invalid': !!error })}>
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
                    defaultValue={defaultValue}
                    onChange={onChange}
                    invalid={!!error}
                    {...attrs}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </InputGroup>
            {error && (<FormText className="c-text-field__error text-center" color="danger">{error.map((message) => translate(message)).join('')}</FormText>)}
        </FormGroup>
    );
}
