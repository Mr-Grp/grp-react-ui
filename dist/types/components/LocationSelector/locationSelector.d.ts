import React, { CSSProperties } from 'react';
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
declare const LocationSelector: React.FC<ILocationSelectorProps>;
export default LocationSelector;
