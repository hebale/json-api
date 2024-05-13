import React from 'react';

import KeyValueInput from '~/features/KeyValueInput';

const onChange = (datas) => console.log(datas);

const Headers = () => {
  return <KeyValueInput onChange={onChange} />;
};

export default Headers;
