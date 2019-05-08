import React from 'react';
import ReactDOM from "react-dom";
import Form from "./Form";
import {useInputs} from '../custom_hooks/useInputs'
import Adapter from 'enzyme-adapter-react-16';
import { renderHook, act } from 'react-hooks-testing-library'
import { shallow, configure, mount } from "enzyme";

configure({ adapter: new Adapter() });

it('should render without problems', function () {
    const div = document.createElement('div');
    ReactDOM.render(<Form/>, div);
    ReactDOM.unmountComponentAtNode(div);
});


const form = mount(<Form/>);

it('should have 4 inputs', function () {
    expect(form.find('input').length).toEqual(4);
});

it('should have inputs with className = input', function () {
    form.find('input').forEach(node => {
        expect(node.hasClass('input')).toEqual(true)
    });
});

// it('should have 1st input with no className = error', function () {
//     let input = form.find('input').at(0);
//     const mockedEvent = { target: { value: "hi", name: "name"}, persist: () => null };
//     act(() => {input.simulate('change', mockedEvent)});
//     form.update();
//     console.log(input.props());
//     act(() => {input.simulate('blur', mockedEvent)});
//     console.log(input.props());
//     expect(input.hasClass('error')).toEqual(true)
// });
