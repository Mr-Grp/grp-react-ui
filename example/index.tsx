import React from 'react';
import ReactDom from 'react-dom';
import { Button, Progress, LocationSelector } from '../src';

const App = () => {
  return (
    <div>
      <Button size="lg" btnType="danger" disabled onClick={() => console.log('g')}>button</Button>
      <Progress percent={89} theme="primary" />
      <LocationSelector />
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
