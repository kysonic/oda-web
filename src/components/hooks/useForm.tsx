import { useState, useCallback, useMemo } from 'react';
import { FieldType, useCallbackType } from 'globals';
import { buildValidationSchema } from '@services/form-validation';

export type FormConfigType = {
    [key: string]: FieldType;
}

export type errorsType = {
    [key: string]: Array<string>;
}

export type useFormReturnType = [FormConfigType, useCallbackType, useCallbackType, errorsType];

export default function useForm(initialState: FormConfigType, submitCallback?: useCallbackType): useFormReturnType {
    const [formData, setFormData] = useState(initialState);
    const validationSchema = useMemo(() => buildValidationSchema(initialState), [initialState]);
    const [errors, setErrors] = useState({});

    const onChange = useCallback((event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: {
                ...formData[name],
                value,
            },
        });
    }, [formData]);

    const isValid = async () => {
        try {
            const normalizedData = formData.values.reduce((acc, item) => {
                return acc[item.name] = item.value;
            }, {});
            await validationSchema.validate(normalizedData, { abortEarly: false });
            setErrors({});

            return true;
        } catch (err) {
            const yupErrors = {};

            err.inner.forEach((error) => {
                const name = error.path.replace(/.+\./, '');
                yupErrors[name] = error.errors;
            });

            setErrors({
                ...errors,
                ...yupErrors,
            });

            return false;
        }
    };

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();

        const isFormValid = await isValid();
        if (isFormValid) {
            submitCallback(formData, errors);
        }
    }, [formData]);

    return [formData, onChange, onSubmit, errors];
}
