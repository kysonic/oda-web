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
        .oneOf([yup.ref('password'), null], 'PASSWORDS_MUST_MATCH'),
};

function getValidatorByType(field: FieldType): ValidatorsType {
    return validators[field.validation] && validators[field.validation]();
}

export function buildValidationSchema(fields: FieldsType, customRules?: ValidatorsType): yup {
    const validateRules = Object.entries(fields).reduce((acc, [fieldName, fieldObj]) => {
        acc[fieldName] = requiredDecorator(getValidatorByType(fieldObj), fieldObj);
        return acc;
    }, {});

    const rules = {
        ...validateRules,
        ...customRules,
    };

    return yup.object().shape(rules);
}
