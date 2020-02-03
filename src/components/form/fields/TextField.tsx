import React, { useState } from 'react';
import { FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    FormText,
    Popover,
    PopoverBody,
} from 'reactstrap';
import { FieldType } from 'globals';
import { translate } from '@i18n/index';
import { isSmall } from '@utils/dom';
import { isBrowser } from '@utils/device';
import * as classNames from 'classnames';

type PopoverErrorPropsType = {
    target: string;
    isOpened?: boolean;
    text?: string;
}

function PopoverError({ target, isOpened = false, text }: PopoverErrorPropsType) {
    let position = 'right';

    if (isBrowser && isSmall()) {
        position = 'bottom';
    }

    return (
        <Popover className="c-popover-error" placement={position} isOpen={isOpened} target={target}>
            <PopoverBody>{text}</PopoverBody>
        </Popover>
    );
}

type TextErrorPropsType = {
    text?: string;
}

function TextError({ text }: TextErrorPropsType) {
    return (<FormText className="c-text-error text-center" color="danger">{text}</FormText>);
}

type TextFieldPropsType = {} & FieldType;

export default function TextField({ fieldType, name, label, placeholder, value = '', defaultValue, onChange, error, className, icon, attrs = {} }: TextFieldPropsType) {
    const [focused, setFocused] = useState(false);
    const id = name + label + placeholder + fieldType;
    const inputGroupId = `input-group-${id}`;

    return (
        <FormGroup className={classNames('c-text-field', { focused })}>
            {label && (<Label className="c-text-field__label" for={name}>{translate(label)}</Label>)}
            <InputGroup id={inputGroupId} className={classNames('c-text-field__input-group', className)}>
                {icon && (
                    <InputGroupAddon className="c-text-field__addon" addonType="prepend">
                        <InputGroupText className={classNames('c-text-field__group-text', { 'is-invalid': !!error })}>
                            <i className={`ni ni-${icon}`} />
                        </InputGroupText>
                    </InputGroupAddon>
                )}
                <Input
                    id={id}
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
            {error && error.length && (
                <PopoverError
                    target={inputGroupId}
                    isOpened={focused}
                    text={error.map((message) => translate(message)).join('')}
                />
            )}
        </FormGroup>
    );
}
