var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState, useEffect, useCallback } from 'react';
import { defaultLocation } from './config';
var LocationSelector = function (_a) {
    var onSelectProvince = _a.onSelectProvince, onSelectCity = _a.onSelectCity, defaultProvince = _a.defaultProvince, defaultCity = _a.defaultCity, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.style, style = _c === void 0 ? {} : _c, _d = _a.locationData, locationData = _d === void 0 ? defaultLocation : _d, locationSearchMethod = _a.locationSearchMethod, citySearchMethod = _a.citySearchMethod, cityValue = _a.cityValue, provinceValue = _a.provinceValue, _e = _a.title, title = _e === void 0 ? '地区选择器' : _e;
    var _f = useState([]), locationOptions = _f[0], setLocationOptions = _f[1];
    var _g = useState([]), cityOptions = _g[0], setCityOptions = _g[1];
    var _h = useState(defaultCity), _cityId = _h[0], setCityId = _h[1];
    var _j = useState(defaultProvince), _provinceId = _j[0], setProvinceId = _j[1];
    var _k = useState(false), loading = _k[0], setLoading = _k[1];
    // 受控组件
    var cityId = cityValue !== undefined ? cityValue : _cityId;
    var provinceId = provinceValue !== undefined ? provinceValue : _provinceId;
    // 获取地域和省份
    var getProvinces = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, locationSearchMethod()];
                case 1:
                    result = _a.sent();
                    setLocationOptions(result);
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); }, [locationSearchMethod]);
    // 获取城市选项列表
    var getCities = useCallback(function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!citySearchMethod) return [3 /*break*/, 1];
                    // 没有搜索接口，使用选中省份的 children
                    locationOptions === null || locationOptions === void 0 ? void 0 : locationOptions.forEach(function (item) {
                        var _a;
                        (_a = item.children) === null || _a === void 0 ? void 0 : _a.forEach(function (p) {
                            if (p.id === id) {
                                setCityOptions(p.children || []);
                            }
                        });
                    });
                    return [3 /*break*/, 3];
                case 1:
                    // 使用接口
                    setLoading(true);
                    return [4 /*yield*/, citySearchMethod(id)];
                case 2:
                    result = _a.sent();
                    setCityOptions(result);
                    setLoading(false);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [citySearchMethod, locationOptions]);
    // 初始化生命周期
    useEffect(function () {
        if (!locationSearchMethod) {
            // 使用默认数据
            setLocationOptions(locationData);
        }
        else {
            // 使用接口数据
            getProvinces();
        }
    }, [locationSearchMethod, locationData, getProvinces]);
    // province 发生改变的时候，获取新 city 列表，通知父组件
    useEffect(function () {
        if (provinceId) {
            getCities(provinceId);
        }
    }, [provinceId, getCities]);
    // 选择省份
    var _onSelectProvince = function (nextProvinceId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (nextProvinceId !== provinceId) {
                // 新的 province，同时清空选中的 city
                setProvinceId(nextProvinceId);
                setCityId(undefined);
                onSelectProvince && onSelectProvince(nextProvinceId);
                onSelectCity && onSelectCity(undefined);
            }
            else {
                // 取消选择，同时清空城市
                setProvinceId(undefined);
                setCityId(undefined);
                setCityOptions([]);
                onSelectProvince && onSelectProvince(undefined);
                onSelectCity && onSelectCity(undefined);
            }
            return [2 /*return*/];
        });
    }); };
    // 选择城市
    var _onSelectCity = function (nextCityId) {
        if (nextCityId !== cityId) {
            // 新的city
            setCityId(nextCityId);
            onSelectCity && onSelectCity(nextCityId);
        }
        else {
            // 取消选择
            setCityId(undefined);
            onSelectCity && onSelectCity(undefined);
        }
    };
    return (React.createElement("div", { className: "g-location-selector ".concat(className), style: style },
        loading && React.createElement("div", { className: "g-loading" }, "\u52A0\u8F7D\u4E2D..."),
        React.createElement("div", { className: "g-location-selector-title" }, title),
        React.createElement("div", { className: "g-location" }, locationOptions.map(function (location) {
            var _a, _b;
            return (React.createElement("div", { className: "g-location-item", key: location.id },
                React.createElement("div", { className: "g-location-item-label" },
                    location.name,
                    ":"),
                React.createElement("div", { className: "g-province" },
                    React.createElement("div", { className: "g-province-list" }, (_a = location.children) === null || _a === void 0 ? void 0 : _a.map(function (province) {
                        return (React.createElement("div", { key: province.id, className: "".concat(province.id === provinceId ? 'g-province-item-selected' : 'g-province-item'), onClick: function () { return _onSelectProvince(province.id); } }, province.name));
                    })),
                    React.createElement("div", { className: "g-city" }, ((_b = location.children) === null || _b === void 0 ? void 0 : _b.find(function (province) { return province.id === provinceId && !!cityOptions.length; }))
                        && (React.createElement("div", { className: "g-city-list" }, cityOptions.map(function (city) {
                            return (React.createElement("div", { key: city.id, className: " ".concat(city.id === cityId ? 'g-city-item-selected' : 'g-city-item'), onClick: function () { return _onSelectCity(city.id); } }, city.name));
                        })))))));
        }))));
};
export default LocationSelector;
