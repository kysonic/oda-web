import React from 'react';
import IndexPage from '@pages/index';
import { render } from '@testing-library/react';

describe('Index page tests', () => {
    test('Renders without crashes', () => {
        const { container } = render(<IndexPage />);
        expect(container).toMatchSnapshot();
    });
});
