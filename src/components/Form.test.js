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

// VERY HARD TO MAKE TESTS WITH REACT HOOKS
// it('should have 1st input with no className = error',async function  () {
//
//     const { waitForNextUpdate, result: { current } } = renderHook(() => useInputs());
//     let input = form.find('input').at(0);
//     await act(async () => {
//         input.simulate('blur')
//         await waitForNextUpdate();
//     });
//     console.log(current.errors);
//     expect(current.errors.name).toEqual(true);
//
// });
