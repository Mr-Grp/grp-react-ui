import React, { useState, useEffect, useCallback, CSSProperties } from 'react';
import { defaultLocation } from './config';

// 地区的格式
export interface ILocationItem {
  id: number;
  name: string;
  children?: ILocationItem[] | null;
}

/**
 * 地区选择器
 * onSelectProvince 省份被选择时触发
 * onSelectCity 城市被选择时触发
 * defaultCity 默认选中 city
 * defaultProvince 默认选中 province
 * cityValue 选中 city 受控组件
 * provinceValue 选中 province 受控组件
 * title 标题
 * className 最外层类名
 * style 最外层样式
 * locationData 组件数据，不传入采用默认数据
 * locationSearchMethod 获取地区省份的方法，不传入采用默认数据
 * citySearchMethod 获取城市的方法，不传入在所在省份数据的 children 查找
 *
 * 注意：省份列表必须分为两层：地域和省份  [{id: 1, name: '华北’, children: [{id：2， name: '河北省', children: []}]}],在使用 locationData 和 locationSearchMethod 注意！！！！！！
 */

export interface ILocationSelectorProps {
  onSelectProvince?: (id: number | undefined) => void;
  onSelectCity?: (id: number | undefined) => void;
  defaultProvince?: number;
  defaultCity?: number;
  provinceValue?: number;
  cityValue?: number;
  title?: string;
  className?: string;
  style?: CSSProperties;
  locationData?: ILocationItem[];
  locationSearchMethod?: () => ILocationItem[] | Promise<ILocationItem[]>;
  citySearchMethod?: (id: number) => ILocationItem[] | Promise<ILocationItem[]>;
}

const LocationSelector: React.FC<ILocationSelectorProps> = ({
  onSelectProvince,
  onSelectCity,
  defaultProvince,
  defaultCity,
  className = '',
  style = {},
  locationData = defaultLocation,
  locationSearchMethod,
  citySearchMethod,
  cityValue,
  provinceValue,
  title = '地区选择器',
}) => {
  const [locationOptions, setLocationOptions] = useState<ILocationItem[]>([]);
  const [cityOptions, setCityOptions] = useState<ILocationItem[]>([]);
  const [_cityId, setCityId] = useState<number | undefined>(defaultCity);
  const [_provinceId, setProvinceId] = useState<number | undefined>(defaultProvince);
  const [loading, setLoading] = useState<boolean>(false);

  // 受控组件
  const cityId = cityValue !== undefined ? cityValue : _cityId;
  const provinceId = provinceValue !== undefined ? provinceValue : _provinceId;
  // 获取地域和省份
  const getProvinces = useCallback(async () => {
    setLoading(true);
    const result: any = await locationSearchMethod!();
    setLocationOptions(result);
    setLoading(false);
  }, [locationSearchMethod]);

  // 获取城市选项列表
  const getCities = useCallback(async (id: number) => {
    if (!citySearchMethod) {
      // 没有搜索接口，使用选中省份的 children
      locationOptions?.forEach(item => {
        item.children?.forEach(p => {
          if (p.id === id) {
            setCityOptions(p.children || []);
          }
        });
      });
    } else {
      // 使用接口
      setLoading(true);
      const result: any = await citySearchMethod!(id);
      setCityOptions(result);
      setLoading(false);
    }
  }, [citySearchMethod, locationOptions]);

  // 初始化生命周期
  useEffect(() => {
    if (!locationSearchMethod) {
      // 使用默认数据
      setLocationOptions(locationData);
    } else {
      // 使用接口数据
      getProvinces();
    }
  }, [locationSearchMethod, locationData, getProvinces]);

  // province 发生改变的时候，获取新 city 列表，通知父组件
  useEffect(() => {
    if (provinceId) {
      getCities(provinceId);
    }
  }, [provinceId, getCities]);

  // 选择省份
  const _onSelectProvince = async (nextProvinceId: number) => {
    if (nextProvinceId !== provinceId) {
      // 新的 province，同时清空选中的 city
      setProvinceId(nextProvinceId);
      setCityId(undefined);
      onSelectProvince && onSelectProvince(nextProvinceId);
      onSelectCity && onSelectCity(undefined);
    } else {
      // 取消选择，同时清空城市
      setProvinceId(undefined);
      setCityId(undefined);
      setCityOptions([]);
      onSelectProvince && onSelectProvince(undefined);
      onSelectCity && onSelectCity(undefined);
    }
  };

  // 选择城市
  const _onSelectCity = (nextCityId: number) => {
    if (nextCityId !== cityId) {
      // 新的city
      setCityId(nextCityId);
      onSelectCity && onSelectCity(nextCityId);
    } else {
      // 取消选择
      setCityId(undefined);
      onSelectCity && onSelectCity(undefined);
    }
  };

  return (
    <div className={`g-location-selector ${className}`} style={style}>
      {loading && <div className="g-loading">加载中...</div>}
      <div className="g-location-selector-title">{title}</div>
      <div className="g-location">
        {locationOptions.map(location => {
          return (
            <div className="g-location-item" key={location.id}>
              <div className="g-location-item-label">
                {location.name}:
              </div>
              <div className="g-province">
                <div className="g-province-list">
                  {location.children?.map(province => {
                    return (
                      <div
                        key={province.id}
                        className={`${province.id === provinceId ? 'g-province-item-selected' : 'g-province-item'}`}
                        onClick={() => _onSelectProvince(province.id)}
                      >
                        {province.name}
                      </div>
                    );
                  })}
                </div>
                <div className="g-city">
                  {location.children?.find(province => province.id === provinceId && !!cityOptions.length)
                    && (
                      <div className="g-city-list">
                        {cityOptions.map(city => {
                          return (
                            <div
                              key={city.id}
                              className={` ${city.id === cityId ? 'g-city-item-selected' : 'g-city-item'}`}
                              onClick={() => _onSelectCity(city.id)}
                            >
                              {city.name}
                            </div>
                          );
                        })}
                      </div>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationSelector;
