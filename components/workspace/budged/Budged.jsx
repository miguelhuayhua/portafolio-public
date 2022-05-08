//react component

import { Component } from 'react';

//react bootstrap
import {
    Tabs, Tab, Button
} from 'react-bootstrap';
//components
import Cocomo from './BudgedTabs/Cocomo';
import FunctionPoint from './BudgedTabs/FunctionPoint';
export default class Budged extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (<>

            <Tabs defaultActiveKey="cocomo" id="uncontrolled-tab-example" className=" mx-3 mb-1">
                <Tab eventKey="cocomo" className='' title="Cocomo">
                    <Cocomo />
                </Tab>
                <Tab eventKey="pf" title="Puntos de función">
                    <FunctionPoint />
                </Tab>
                <Tab eventKey="ldc" title="Lineas de código">
                </Tab>
                <Tab eventKey="olp" title="OLP">
                </Tab>
                <Tab eventKey="fuzzi" title="Lógica Fuzzi">
                </Tab>
            </Tabs>

        </>

        );
    }
}