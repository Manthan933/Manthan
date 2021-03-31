import React from "react";
import {render} from '@testing-library/react'
import {unmountComponentAtNode} from 'react-dom'
import ClassCard from '../../components/ClassCard/ClassCard'
import {Class} from "@material-ui/icons";

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


it('Class Card renders successfully' ,() => {
    const Class = {
        code: 'Hello',
        instructor:{
            name: 'Hello2'
        }
    }

    const container = render(<ClassCard Class={Class}/>)
    expect(container).toBeTruthy()
})