import { useState, useCallback } from 'react';

export type formConfigItemType = {
    value: string | number;
    validateErrors: {};
    type: 'email' | 'text' | 'number' | 'password';
    placeholder?: string;
};

export type formConfigType = {
    [key: string]: formConfigItemType;
}

export default function useForm(initialState: formConfigType): [formConfigType, fn] {
    const [formData, setFormData] = useState(initialState);

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

    return [formData, onChange];
}
