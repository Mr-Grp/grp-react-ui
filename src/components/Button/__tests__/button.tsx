import { shallow, mount } from 'enzyme';
import { findTestWrapper } from '../../../utils/testUtil';
import Button from '..';

describe('Button 测试', () => {
  test('默认参数应该正常渲染', () => {
    const wrapper = shallow(
      <Button>Test</Button>,
    );
    const btnElem = findTestWrapper(wrapper, 'button');
    expect(btnElem).toExist();
    expect(btnElem.text()).toBe('Test');
    expect(btnElem.prop('className')).toBe('btn btn-default');
  });

  test('其他参数应该正常渲染', () => {
    const wrapper = shallow(
      <Button
        btnType="primary"
        size="lg"
        className="test"
      >
        Test
      </Button >,
    );
    const btnElem = findTestWrapper(wrapper, 'button');
    expect(btnElem).toExist();
    expect(btnElem.text()).toBe('Test');
    expect(btnElem.prop('className')).toContain('btn');
    expect(btnElem.prop('className')).toContain('btn-primary');
    expect(btnElem.prop('className')).toContain('test');
    expect(btnElem.prop('className')).toContain('btn-lg');
  });

  test('当disabled为false时，应该触发点击操作', () => {
    const fn = jest.fn();
    const wrapper = mount(
      <Button onClick={fn}>button</Button>,
    );
    const btnElem = findTestWrapper(wrapper, 'button');
    expect(btnElem.prop('disabled')).toBeFalsy();
    btnElem.simulate('click');
    expect(fn).toHaveBeenCalled();
  });

  test('当disabled为true时，不应该触发点击操作', () => {
    const fn = jest.fn();
    const wrapper = mount(
      <Button disabled onClick={fn}>button</Button>,
    );
    const btnElem = findTestWrapper(wrapper, 'button');
    expect(btnElem.prop('disabled')).toBeTruthy();
    btnElem.simulate('click');
    expect(fn).not.toHaveBeenCalled();
  });

  test('作为link标签应该正常渲染', () => {
    const wrapper = mount(
      <Button btnType="link" href="https://www.baidu.com">
        Test
      </Button>,
    );
    const btnElem = findTestWrapper(wrapper, 'link');
    expect(btnElem).toExist();
    expect(btnElem.text()).toBe('Test');
    expect(btnElem.prop('className')).toBe('btn btn-link');
    expect(btnElem.prop('href')).toBe('https://www.baidu.com');
  });

  test('测试完成，保存快照', () => {
    const wrapper = shallow(
      <Button>Test</Button>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
