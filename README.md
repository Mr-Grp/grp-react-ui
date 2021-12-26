# 安装
```
npm install grp-react-ui
```

# 使用
```
import React from 'react';
import ReactDom from 'react-dom';
import { Button, Progress } from 'grp-react-ui';
import 'grp-react-ui/dist/index.css';

const App = () => {
  return (
    <div>
      <Button size="lg" btnType="danger">button</Button>
      <Progress percent={89} theme="primary" />
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
```

# 按需加载
```
npm i npm i -D ui-component-loader
```
在 webpack 的 ts-loader 后面加入（js 在 babel-loader 后面加入）：
```
{
  loader: 'ui-component-loader',
  options: {
    lib: 'grp-react-ui',
    libDir: 'dist',
    style: 'index.css',
  },
}
```