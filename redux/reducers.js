

//create a reducer for the countrie flags and phone number that displays at the NavbarMain Component

import { createReducer } from '@reduxjs/toolkit';
//constants
import {
    ADDNUMBER, NAMECHANGED, EMAILCHANGED, PHONECHANGED, PHONECODECHANGED, UPDATECERTIFICATES,
    PASSWORDCHANGED, USERNAMECHANGED, LOGEDCHANGED
} from './constants';
//flags
import { AR, BO, CL, EC, MX, PE, UY } from 'country-flag-icons/react/3x2';
import { passThroughSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

export const phoneNumber = createReducer({
    phone: '0',
    numbers: [
        { countrie: 'AR', code: '+54', flag: <AR /> },
        { countrie: 'BO', code: '+591', flag: <BO /> },
        { countrie: 'CH', code: '+56', flag: <CL /> },
        { countrie: 'EC', code: '+593', flag: <EC /> },
        { countrie: 'ME', code: '+52', flag: <MX /> },
        { countrie: 'PE', code: '+51', flag: <PE /> },
        { countrie: 'UG', code: '+598', flag: <UY /> },

    ]
}, (builder) => {
    builder.addCase(ADDNUMBER, (state, action) => {
        return { ...state, phone: action.payload }
    })
})

//customer reducer
//initial state
const clientState = {
    name: "",
    email: "",
    phoneCode: "+54",
    phone: ""
}
export const clientReducer = createReducer(clientState, (builder) => {
    builder.addCase(NAMECHANGED, (state, action) => {
        return { ...state, name: action.payload };
    }).
        addCase(EMAILCHANGED, (state, action) => {
            return { ...state, email: action.payload };
        }).
        addCase(PHONECHANGED, (state, action) => {
            return { ...state, phone: action.payload };
        }).
        addCase(PHONECODECHANGED, (state, action) => {
            console.log(action)
            return { ...state, phoneCode: action.payload };
        })
})


//certificate array will be filled here 
export const certificateReducer = createReducer([], (builder) => {
    builder.addCase(UPDATECERTIFICATES, (state, action) => {
        return [...action.payload];
    })
})

//and adding the information
//initial state
const certificateInitialState = {
    titule: '',
    date: null,
    business: ''
}
export const certificateFieldsReducer = createReducer({})

//login state will be filled here
const loginInitialState = {
    username: "",
    password: "",
    loged: ""
}
export const loginReducer = createReducer(loginInitialState, (builder) => {
    builder.addCase(USERNAMECHANGED, (state, action) => {
        return { ...state, username: action.payload }
    }).addCase(PASSWORDCHANGED, (state, action) => {
        return { ...state, password: action.payload }

    }).addCase(LOGEDCHANGED, (state, action) => {
        return { ...state, loged: action.payload }
    })
})
