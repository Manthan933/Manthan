import React from "react";
import {render} from '@testing-library/react'
import {unmountComponentAtNode} from 'react-dom'
import TestCard from '../../components/TestCard/TestCard'

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


it('Test Card renders successfully' ,() => {
    const Test = {
        name: 'test',
        dueDate: '321',
        _id:231
    }
    const container = render(<TestCard Test={Test}/>)
    expect(container).toBeTruthy()
})