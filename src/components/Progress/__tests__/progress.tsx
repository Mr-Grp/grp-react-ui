import { shallow } from 'enzyme';
import Progress from '..';
import { findTestWrapper } from '../../../utils/testUtil';

describe('Progress 测试', () => {
  test('默认进度条应该正常展示', () => {
    const wrapper = shallow(<Progress percent={10} />);
    const progressElem = findTestWrapper(wrapper, 'progress');
    const progressOuterElem = findTestWrapper(wrapper, 'progress-outer');
    const progressInnerElem = findTestWrapper(wrapper, 'progress-inner');
    const progressInnerTextElem = findTestWrapper(wrapper, 'progress-inner-text');
    expect(progressElem).toExist();
    expect(progressOuterElem).toExist();
    expect(progressInnerElem).toExist();
    expect(progressInnerTextElem).toExist();
    expect(progressInnerElem.prop('style')).toMatchObject({ width: '10%' });
    expect(progressInnerElem.prop('className')).toContain('color-primary');
    expect(progressOuterElem.prop('style')).toMatchObject({ height: '15px' });
    expect(progressInnerTextElem.text()).toContain('10%');
  });

  test('进度条可以传入其他风格', () => {
    const wrapper = shallow(
      <Progress percent={10} strokeHeight={20} theme="danger" />,
    );
    const progressOuterElem = findTestWrapper(wrapper, 'progress-outer');
    const progressInnerElem = findTestWrapper(wrapper, 'progress-inner');
    expect(progressOuterElem.prop('style')).toMatchObject({ height: '20px' });
    expect(progressInnerElem.prop('className')).toContain('color-danger');
  });

  test('可以不展示百分比文字', () => {
    const wrapper = shallow(
      <Progress percent={10} showText={false} />,
    );
    const progressInnerTextElem = findTestWrapper(wrapper, 'progress-inner-text');
    expect(progressInnerTextElem).not.toExist();
  });

  test('测试完成，保存快照', () => {
    const wrapper = shallow(
      <Progress percent={10} showText={false} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
