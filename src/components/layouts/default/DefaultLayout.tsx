import React from 'react';

export type DefaultLayoutPropsType = {
    children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutPropsType) {
    return (
        <div>
            {children}
        </div>
    );
}
