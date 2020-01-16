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
