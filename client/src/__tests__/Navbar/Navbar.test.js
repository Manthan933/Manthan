import React from "react";
import {render} from '@testing-library/react'
import {unmountComponentAtNode} from 'react-dom'
import MenuAppBar from  '../../components/Navbar/Navbar'

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


it('Navbar rendering' , () => {
    const container = render(<MenuAppBar Classes={[]}/>)
    expect(container).toBeTruthy()
})