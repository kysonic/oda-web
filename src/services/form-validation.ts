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
    confirmPassword: () => yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
};

function getValidatorByType(field: FieldType): ValidatorsType {
    if (typeof field.validation === 'string') {
        return validators[field.validation] && validators[field.validation]();
    }
    if (Array.isArray(field.validation)) {
        return field.validation.reduce((acc, validation) => validators[validation] && validators[validation]());
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
