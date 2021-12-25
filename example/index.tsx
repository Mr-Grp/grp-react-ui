import React from 'react';
import ReactDom from 'react-dom';
import Button from '../src';

const App = () => {
  return (
    <div>
      <Button />
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
