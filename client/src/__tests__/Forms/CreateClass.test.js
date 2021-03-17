import React from "react";
import {render} from '@testing-library/react'
import {unmountComponentAtNode} from 'react-dom'
import CreateClass from '../../components/Froms/CreateClass'


it('Create Form Renders Successfully', () => {
    const props = {
        open: false,
        setOpen : function (){

        },
        createClass: function (config){

        },
        updateClass: function (){
        },
        editable: false,
        classDetails: "hello"
    }
    const container = render(<CreateClass props={props}/>)
    expect(container).toBeTruthy()
})


it('Create Form Functionality is working',() => {
    const props = {
        open: false,
        setOpen : function (){
        },
        createClass: function (config){

        },
        updateClass: function (){
        },
        editable: false,
        classDetails: {
            subject:'Maths',
            subcode: 450,
            name: 'MATHS101'
        }
    }
    const {getByTestId} = render(<CreateClass props/>)
    const inputValue = getByTestId('name').getAttribute('defaultValue')
    expect(inputValue).toBe('MATHS101' | '')
})