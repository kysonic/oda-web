import { useState, useEffect } from 'react';
import { cut, toError } from '@utils/string';

const GRAPHQL_ERROR_PREFIX = 'GraphQL error:';

const DEFAULT_ERROR_MAPPER = {
    INVALID_PASSWORD: 'password',
    NO_SUCH_USER_FOUND: 'email',
    'A_UNIQUE_CONSTRAINT_WOULD_BE_VIOLATED_ON_USER._DETAILS:_FIELD_NAME_=_EMAIL': 'email',
};

// Use apollo errors should be compatible with ./components/form/Form.tsx

export default function useApolloErrors(error, errorMapper = DEFAULT_ERROR_MAPPER) {
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (error) {
            const errorMessage = toError(cut(error.message, GRAPHQL_ERROR_PREFIX).trim());
            const field = errorMapper[errorMessage] || 'common';

            setErrors({
                [field]: [errorMessage],
            });
        }
    }, [error]);

    return [errors];
}
