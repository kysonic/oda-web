import { useState, useCallback, useMemo } from 'react';
import { FieldType, useCallbackType } from 'globals';
import { buildValidationSchema } from '@services/form-validation';

export type FormConfigType = {
    [key: string]: FieldType;
}

export type useFormReturnType = [FormConfigType, useCallbackType, useCallbackType];

export default function useForm(initialState: FormConfigType, submitCallback?: useCallbackType): useFormReturnType {
    const [formData, setFormData] = useState(initialState);
    const validationSchema = useMemo(() => buildValidationSchema(initialState), [initialState]);
    console.log(validationSchema);
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

    const onSubmit = useCallback((event) => {
        event.preventDefault();

        if (submitCallback) {
            submitCallback();
        }
    }, []);

    return [formData, onChange, onSubmit];
}
