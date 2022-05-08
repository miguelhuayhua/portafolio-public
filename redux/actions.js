//create a action that sends the value of phone number option at navbarmain component

import { createAction } from "@reduxjs/toolkit";
import {
    ADDNUMBER, EMAILCHANGED, NAMECHANGED, PHONECHANGED, PHONECODECHANGED, UPDATECERTIFICATES,
    PASSWORDCHANGED, USERNAMECHANGED, LOGEDCHANGED
} from "./constants";
export const addNumber = createAction(ADDNUMBER);

//create an action when input value change
export const nameChange = createAction(NAMECHANGED);
export const emailChange = createAction(EMAILCHANGED);
export const phoneChange = createAction(PHONECHANGED);
export const phoneCodeChange = createAction(PHONECODECHANGED);

//certificates actions
export const chargeCertificates = createAction(UPDATECERTIFICATES);

//login actions

export const userNameChange = createAction(USERNAMECHANGED);
export const passwordChange = createAction(PASSWORDCHANGED);
export const logedChange = createAction(LOGEDCHANGED);