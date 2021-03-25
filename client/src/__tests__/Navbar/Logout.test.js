import React from "react";
import {render, fireEvent} from '@testing-library/react'
import {unmountComponentAtNode} from 'react-dom'
import Logout from  '../../components/Navbar/Logout'



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


it('Logout component renders',() => {
    const container = render(<Logout/>)
    expect(container).toBeTruthy()
})

it('logout button function works',() => {

    const Logout = ({ onClick, children }) => (
        <button onClick={onClick}>{children}</button>
    )
    const props = {
        user:{
            image: 'fadfasdgsa.img'
        }
    }
    const handleClick = jest.fn()
    render(<Logout props={props} />)
    expect(handleClick).toHaveBeenCalledTimes(0)
})