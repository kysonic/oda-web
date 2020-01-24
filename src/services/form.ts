import * as yup from 'yup';
import '@services/validators';
import { FieldType, FieldsType } from 'globals';
import { map } from '@utils/object';

type ValidatorsType = {
    [key: string]: yup;
}

const requiredDecorator = (validator, field) => {
    if (validator && field.required) {
        return validator.required('FIELD_MUST_NOT_BE_EMPTY');
    }

    return validator;
};

const validators: ValidatorsType = {
    email: () => yup.string().email('EMAIL_IS_NOT_CORRECT').max(100),
    password: () => yup.string().strongPassword('PASSWORD_IS_WEAK'),
};

function getValidatorByType(field: FieldType): ValidatorsType {
    return validators[field.validation] && validators[field.validation]();
}

export function buildValidationSchema(fields: FieldsType, customRules?: ValidatorsType): yup {
    const rules = {
        ...map(fields, (field) => yup.object().shape({ value: requiredDecorator(getValidatorByType(field), field) })),
        ...customRules,
    };

    return yup.object().shape(rules);
}

export const emailFieldFactory = (extra = {}) => (
    {
        type: 'text',
        name: 'email',
        fieldType: 'email',
        placeholder: 'EMAIL',
        validation: 'email',
        required: true,
        className: 'input-group--rounded',
        icon: 'ui-outline-1_email-83',
        ...extra,
    }
);

export const passwordFieldFactory = (extra = {}) => (
    {
        type: 'text',
        name: 'password',
        fieldType: 'password',
        placeholder: 'PASSWORD',
        validation: 'password',
        required: true,
        className: 'input-group--rounded',
        icon: 'ui-outline-1_lock-circle',
        ...extra,
    }
);

export const rememberMeFieldFactory = (extra = {}) => (
    {
        type: 'checkbox',
        name: 'rememberMe',
        label: 'REMEMBER_ME',
        required: false,
        ...extra,
    }
);
