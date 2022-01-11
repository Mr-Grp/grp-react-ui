import { shallow, mount } from 'enzyme';
import { waitForComponentToPaint } from '../../../utils/testUtil';
import LocationSelector from '..';
import { defaultLocation } from '../config';

describe('LocationSelector 测试', () => {
  test('可以正确出现的在页面里', () => {
    const wrapper = shallow(
      <LocationSelector />,
    );
    expect(wrapper.find('.g-location-selector')).toExist();
  });

  test('默认使用config数据', () => {
    const wrapper = mount(
      <LocationSelector />,
    );
    const locationElem = wrapper.find('.g-location-item');
    expect(locationElem.length).toEqual(defaultLocation.length);

    for (let i = 0; i < locationElem.length; i++) {
      const locationItem = locationElem.at(i);
      const locationLabelElem = locationItem.find('.g-location-item-label').text();
      const provinceElem = locationItem.find('.g-province-item');
      expect(locationLabelElem).toMatch(defaultLocation[i].name);

      const provinceData = defaultLocation[i].children;
      expect(provinceElem.length).toBe(provinceData.length);
      for (let j = 0; j < provinceElem.length; j++) {
        expect(provinceElem.at(j).text()).toMatch(provinceData[j].name);
      }
    }
  });

  test('点击 province 时会选中,并展示对应 city 列表,city 列表数据默认为 province.children', () => {
    const wrapper = mount(
      <LocationSelector />,
    );
    let provinceElem = wrapper.find('.g-province-item');
    const provinceData = defaultLocation.map(item => item.children).flat();
    expect(provinceElem.length).toBe(provinceData.length);
    const len = provinceElem.length;
    const random = Math.floor(Math.random() * len);
    const targetElem = provinceElem.at(random);
    targetElem.simulate('click');
    wrapper.update();
    provinceElem = wrapper.find('.g-province-item-selected');
    expect(provinceElem.text()).toMatch(provinceData[random].name);

    const cityData = provinceData[random].children;
    const cityElem = wrapper.find('.g-city-item');
    expect(cityElem.length).toBe(cityData.length);

    for (let i = 0; i < cityElem.length; i++) {
      expect(cityElem.at(i).text()).toMatch(cityData[i].name);
    }
  });

  test('再次点击相同 province 时,取消选中,并隐藏 city 列表', () => {
    const wrapper = mount(
      <LocationSelector />,
    );
    let provinceElem = wrapper.find('.g-province-item');
    const len = provinceElem.length;
    const random = Math.floor(Math.random() * len);
    const targetElem = provinceElem.at(random);
    targetElem.simulate('click');
    wrapper.update();
    provinceElem = wrapper.find('.g-province-item-selected');
    expect(provinceElem.length).toBe(1);
    provinceElem.simulate('click');
    wrapper.update();
    provinceElem = wrapper.find('.g-province-item-selected');
    expect(provinceElem.length).toBe(0);
  });

  test('点击 city 时会选中', () => {
    const wrapper = mount(
      <LocationSelector />,
    );
    const provinceElem = wrapper.find('.g-province-item');
    const provinceData = defaultLocation.map(item => item.children).flat();
    expect(provinceElem.length).toBe(provinceData.length);
    const len = provinceElem.length;
    let random = Math.floor(Math.random() * len);
    let targetElem = provinceElem.at(random);
    targetElem.simulate('click');
    wrapper.update();

    const cityData = provinceData[random].children;
    const cityElem = wrapper.find('.g-city-item');

    random = Math.floor(Math.random() * cityElem.length);
    targetElem = cityElem.at(random);
    targetElem.simulate('click');
    wrapper.update();
    targetElem = wrapper.find('.g-city-item-selected');
    expect(targetElem.text()).toMatch(cityData[random].name);
  });

  test('再次点击相同 city 时,取消选中', () => {
    const wrapper = mount(
      <LocationSelector />,
    );
    const provinceElem = wrapper.find('.g-province-item');
    const provinceData = defaultLocation.map(item => item.children).flat();
    expect(provinceElem.length).toBe(provinceData.length);
    const len = provinceElem.length;
    let random = Math.floor(Math.random() * len);
    let targetElem = provinceElem.at(random);
    targetElem.simulate('click');
    wrapper.update();

    const cityElem = wrapper.find('.g-city-item');

    random = Math.floor(Math.random() * cityElem.length);
    targetElem = cityElem.at(random);
    targetElem.simulate('click');
    wrapper.update();
    targetElem = wrapper.find('.g-city-item-selected');
    expect(targetElem.length).toBe(1);
    targetElem.simulate('click');
    wrapper.update();
    targetElem = wrapper.find('.g-city-item-selected');
    expect(targetElem.length).toBe(0);
  });

  test('传入 onSelectProvince, 点击 province,会调用该方法,并传入 id', () => {
    const fn = jest.fn();
    const wrapper = mount(
      <LocationSelector onSelectProvince={fn} />,
    );
    const provinceElem = wrapper.find('.g-province-item');
    const provinceData = defaultLocation.map(item => item.children).flat();
    const random = Math.floor(Math.random() * provinceElem.length);
    const targetElem = provinceElem.at(random);
    targetElem.simulate('click');
    expect(fn).toBeCalledWith(provinceData[random].id);
  });

  test('传入 onSelectCity, 点击 city, 会调用该方法,并传入 id', () => {
    const fn = jest.fn();
    const wrapper = mount(
      <LocationSelector onSelectCity={fn} />,
    );
    const provinceElem = wrapper.find('.g-province-item');
    const provinceData = defaultLocation.map(item => item.children).flat();
    let random = Math.floor(Math.random() * provinceElem.length);
    const targetElem = provinceElem.at(random);
    targetElem.simulate('click');
    wrapper.update();
    const cityData = provinceData[random].children;
    const cityElem = wrapper.find('.g-city-item');
    random = Math.floor(Math.random() * cityElem.length);
    cityElem.at(random).simulate('click');
    expect(fn).toBeCalledWith(cityData[random].id);
  });

  test('传入正确的 defaultProvince, 会设置 province 默认值', () => {
    const provinceData = defaultLocation.map(item => item.children).flat();
    const random = Math.floor(Math.random() * provinceData.length);
    const wrapper = mount(
      <LocationSelector defaultProvince={provinceData[random].id} />,
    );
    const provinceElem = wrapper.find('.g-province-item-selected');
    expect(provinceElem.text()).toMatch(provinceData[random].name);
  });

  test('传入正确的 defaultCity, 会设置 city 默认值', () => {
    const provinceData = defaultLocation.map(item => item.children).flat();
    const random = Math.floor(Math.random() * provinceData.length);

    const wrapper = mount(
      <LocationSelector defaultProvince={provinceData[random].id} defaultCity={provinceData[random].children[0].id} />,
    );
    const cityElem = wrapper.find('.g-city-item-selected');
    expect(cityElem.text()).toMatch(provinceData[random].children[0].name);
  });

  test('传入 provinceValue, 会默认选中该 province, 并且完全受控', () => {
    const provinceData = defaultLocation.map(item => item.children).flat();
    const random = Math.floor(Math.random() * provinceData.length);
    const wrapper = mount(
      <LocationSelector provinceValue={provinceData[random].id} />,
    );
    const provinceElem = wrapper.find('.g-province-item');
    const newRandom = Math.floor(Math.random() * provinceElem.length);
    provinceElem.at(newRandom).simulate('click');
    wrapper.update();
    const targetElem = wrapper.find('.g-province-item-selected');
    expect(targetElem.text()).toMatch(provinceData[random].name);
  });

  test('传入 cityValue, 会默认选中该 city, 并且完全受控', () => {
    const provinceData = defaultLocation.map(item => item.children).flat();

    const wrapper = mount(
      <LocationSelector provinceValue={provinceData[0].id} cityValue={provinceData[0].children[0].id} />,
    );
    let cityElem = wrapper.find('.g-city-item-selected');
    expect(cityElem.text()).toMatch(provinceData[0].children[0].name);
    cityElem = wrapper.find('.g-city-item');
    cityElem.at(Math.floor(Math.random() * cityElem.length)).simulate('click');
    wrapper.update();
    cityElem = wrapper.find('.g-city-item-selected');
    expect(cityElem.text()).toMatch(provinceData[0].children[0].name);
  });

  test('传入 title, 会展示title', () => {
    const text = '地区选择器';
    const wrapper = shallow(
      <LocationSelector title={text} />,
    );
    expect(wrapper.find('.g-location-selector-title').text()).toBe(text);
  });

  test('可以正确传入类名和 style', () => {
    const style = {
      color: 'red',
    };
    const className = 'g-test';
    const wrapper = shallow(
      <LocationSelector style={style} className={className} />,
    );
    expect(wrapper.find('.g-location-selector').prop('className')).toMatch(className);
    expect(wrapper.find('.g-location-selector').prop('style')).toMatchObject(style);
  });

  test('传入 locationData, 会使用 locationData', () => {
    const testLocation = [{ id: 1, name: 'test', children: [{ id: 2, name: 'test1', children: [{ id: 3, name: 'test3', children: null }] }] }];
    const wrapper = mount(
      <LocationSelector locationData={testLocation} />,
    );
    const locationElem = wrapper.find('.g-location-item');
    expect(locationElem.length).toEqual(testLocation.length);

    for (let i = 0; i < locationElem.length; i++) {
      const locationItem = locationElem.at(i);
      const locationLabelElem = locationItem.find('.g-location-item-label').text();
      const provinceElem = locationItem.find('.g-province-item');
      expect(locationLabelElem).toMatch(testLocation[i].name);

      const provinceData = testLocation[i].children;
      expect(provinceElem.length).toBe(provinceData.length);
      for (let j = 0; j < provinceElem.length; j++) {
        expect(provinceElem.at(j).text()).toMatch(provinceData[j].name);
      }
    }
  });

  test('传入 locationSearchMethod, 会使用 locationSearchMethod 获取省份和区域,比 locationData 优先级更高', async () => {
    const testLocation = [{ id: 1, name: 'test', children: [{ id: 2, name: 'test1', children: [{ id: 3, name: 'test3', children: null }] }] }];
    const testLocation1 = [{ id: 1, name: 'test1', children: [{ id: 2, name: 'test2', children: [{ id: 3, name: 'test4', children: null }] }] }];

    const wrapper = mount(
      <LocationSelector
        locationData={testLocation}
        locationSearchMethod={() => testLocation1}
      />,
    );
    await waitForComponentToPaint(wrapper);
    const locationElem = wrapper.find('.g-location-item');

    for (let i = 0; i < locationElem.length; i++) {
      const locationItem = locationElem.at(i);
      const locationLabelElem = locationItem.find('.g-location-item-label').text();
      const provinceElem = locationItem.find('.g-province-item');
      expect(locationLabelElem).toMatch(testLocation1[i].name);

      const provinceData = testLocation1[i].children;
      expect(provinceElem.length).toBe(provinceData.length);
      for (let j = 0; j < provinceElem.length; j++) {
        expect(provinceElem.at(j).text()).toMatch(provinceData[j].name);
      }
    }
  });

  test('传入 citySearchMethod, 会使用 citySearchMethod 获取省份和区域,比 locationData 优先级更高', async () => {
    const testCity = [{ id: 1, name: 'test', children: [{ id: 2, name: 'test1', children: [{ id: 3, name: 'test3', children: null }] }] }];

    const wrapper = mount(
      <LocationSelector citySearchMethod={() => testCity} />,
    );
    const provinceElem = wrapper.find('.g-province-item');
    const random = Math.floor(Math.random() * provinceElem.length);
    const targetElem = provinceElem.at(random);
    targetElem.simulate('click');
    await waitForComponentToPaint(wrapper);
    const cityElem = wrapper.find('.g-city-item');
    expect(cityElem.length).toBe(testCity.length);

    for (let i = 0; i < cityElem.length; i++) {
      expect(cityElem.at(i).text()).toMatch(testCity[i].name);
    }
  });

  test('测试完成，保存快照', () => {
    const wrapper = shallow(
      <LocationSelector />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
