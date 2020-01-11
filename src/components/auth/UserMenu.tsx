import React from 'react';

type UserMenuPropsType = {
    className?: string;
}

export default function UserMenu({ className }: UserMenuPropsType) {
    return (
        <div className={className}>
            <i className="ni ni-badge" />
            <span className="ml-2">soooyc@gmail.com</span>
        </div>
    );
}
