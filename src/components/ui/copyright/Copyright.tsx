import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import { translate } from '@i18n/index';

import './Copyright.scss';

export type CopyrightPropsType = {} & ClassNameType;

export default function Copyright({ className }: CopyrightPropsType) {
    return (
        <div className={classNames('c-copyright', className)}>
            {`${translate('COPYRIGHT')} ${new Date().getFullYear()} Oda. ${translate('ALL_RIGHTS_RESERVED')}.`}
        </div>
    );
}
