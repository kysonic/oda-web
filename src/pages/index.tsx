import React from 'react';
import { NextPage } from 'next';

import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from 'reactstrap';

const Home: NextPage = () => (
    <>
        <UncontrolledDropdown>
            <DropdownToggle caret color="secondary">
                Regular
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    Action
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    Another action
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    Something else here
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
        <i className="ni ni-air-baloon" />
    </>
)

export default Home;
