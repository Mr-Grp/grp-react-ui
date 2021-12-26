import React from 'react';
import ReactDom from 'react-dom';
import { Button, Progress } from '../src';

const App = () => {
  return (
    <div>
      <Button size="lg" btnType="danger" disabled onClick={() => console.log(131231)}>button</Button>
      <Progress percent={89} theme="primary" />
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
