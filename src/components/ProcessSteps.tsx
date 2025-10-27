import { Steps } from 'antd';

import { content } from '../content/hv';

const ProcessSteps = () => (
  <Steps
    responsive
    items={content.process.map((step) => ({
      title: step.title,
      description: step.description,
    }))}
  />
);

export default ProcessSteps;
