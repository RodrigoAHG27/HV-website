import { CheckCircleOutlined } from '@ant-design/icons';

import { content } from '../content/hv';

const Differentiators = () => (
  <div className="differentiators">
    {content.differentiators.map((item) => (
      <div className="differentiator" key={item.title}>
        <div className="differentiator__icon">
          <CheckCircleOutlined />
        </div>
        <div>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      </div>
    ))}
  </div>
);

export default Differentiators;
