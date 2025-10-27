import { Alert } from 'antd';

import { content } from '../content/hv';

const TopNotice = () => (
  <Alert banner message={content.topNotice} type="info" showIcon />
);

export default TopNotice;
