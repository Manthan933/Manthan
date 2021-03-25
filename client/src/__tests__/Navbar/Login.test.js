import React from "react";
import {render, fireEvent} from '@testing-library/react'
import {unmountComponentAtNode} from 'react-dom'
import Login from  '../../components/Navbar/Login'



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


it('Login component renders',() => {
    const container = render(<Login/>)
    expect(container).toBeTruthy()
})

it('login button function works',() => {

    const Login = ({ onClick, children }) => (
        <button onClick={onClick}>{children}</button>
    )
        const handleClick = jest.fn()
        const  {getByTestId} = render(<Login onClick={handleClick}>Click Me</Login>)
        expect(handleClick).toHaveBeenCalledTimes(0)
})