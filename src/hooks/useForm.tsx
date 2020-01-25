import { useState, useCallback, useMemo } from 'react';
import { FieldsType, useCallbackType } from 'globals';
import { buildValidationSchema } from '@services/form';

export type errorsType = {
    [key: string]: Array<string>;
}

function getValueByType(type, { value, checked }) {
    if (type === 'checkbox') {
        return checked;
    }

    return value;
}

export type useFormReturnType = [FieldsType, useCallbackType, useCallbackType, errorsType, Function];

export default function useForm(initialState: FieldsType, submitCallback?: useCallbackType): useFormReturnType {
    const [formData, setFormData] = useState(initialState);
    const validationSchema = useMemo(() => buildValidationSchema(initialState), [initialState]);
    const [errors, setErrors] = useState({});

    const onChange = useCallback((event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = getValueByType(type, { value, checked });

        setFormData({
            ...formData,
            [name]: {
                ...formData[name],
                value: inputValue,
            },
        });
    }, [formData]);

    const isValid = async () => {
        setErrors({});

        try {
            const normalized = Object.entries(formData).reduce((acc, [key, value]) => {
                acc[key] = value.value;
                return acc;
            }, {});

            await validationSchema.validate(normalized, { abortEarly: false });

            return true;
        } catch (err) {
            const yupErrors = {};

            err.inner.forEach((error) => {
                const { path } = error;
                yupErrors[path] = error.errors;
            });

            setErrors({
                ...yupErrors,
            });

            return false;
        }
    };

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();

        const isFormValid = await isValid();

        if (isFormValid) {
            submitCallback(formData);
        }
    }, [formData]);

    return [formData, onChange, onSubmit, errors, setErrors];
}
