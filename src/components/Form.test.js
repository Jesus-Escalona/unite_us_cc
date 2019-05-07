import React from 'react';
import ReactDOM from "react-dom";
import Form from "./Form";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure} from "enzyme";

configure({ adapter: new Adapter() });

it('should render without problems', function () {
    const div = document.createElement('div');
    ReactDOM.render(<Form/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should have 4 inputs', function () {
    const form = shallow(<Form/>);
    expect(form.find('input').length).toEqual(4);
});
