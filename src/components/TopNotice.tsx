import { InfoCircleOutlined } from '@ant-design/icons';

import { content } from '../content/hv';

const TopNotice = () => (
  <div className="top-notice">
    <InfoCircleOutlined />
    <span>{content.topNotice}</span>
  </div>
);

export default TopNotice;
