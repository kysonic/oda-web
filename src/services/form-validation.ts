import * as yup from 'yup';
import '@services/validators';
import { FieldType, FieldsType } from 'globals';
import { map } from '@utils/object';

type ValidatorsType = {
    [key: string]: yup;
}

const requiredDecorator = (validator, field) => {
    if (validator && field.required) {
        return validator.required('Field must be not empty');
    }

    return validator;
};

const validators: ValidatorsType = {
    email: () => yup.string().email('Email is incorrect').max(100),
    password: () => yup.string().strongPassword('Password is weak'),
    confirmPassword: () => yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
};

function getValidatorByType(field: FieldType): ValidatorsType {
    if (typeof field.validation === 'string') {
        return validators[field.validation] && validators[field.validation]();
    }
    if (Array.isArray(field.validation)) {
        return field.validation.reduce((acc, validation) => {
            return validators[validation] && validators[validation]();
        });
    }
    return {};
}

export function buildValidationSchema(fields: FieldsType, customRules?: ValidatorsType): yup {
    const rules = {
        // ...map(fields, (field, key) => yup.object().shape(({ ...requiredDecorator(getValidatorByType(field), field) }))),
        ...map(fields, (field, key) => yup.object().shape({ [key]: requiredDecorator(getValidatorByType(field), field) })),
        ...customRules,
    };
    console.log(rules);
    return yup.object().shape(rules);
}
