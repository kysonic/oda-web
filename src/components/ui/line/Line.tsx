import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';

import './Line.scss';

export type LinePropsType = {} & ClassNameType

export default function Line({ className }: LinePropsType) {
    return (
        <div className={classNames('c-line mw-100 bg-gradient-line', className)} />
    );
}
