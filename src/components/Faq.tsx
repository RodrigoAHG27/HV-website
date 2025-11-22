import { Collapse } from 'antd';

import { content } from '../content/hv';

const Faq = () => (
  <div className="faq">
    <Collapse
      accordion
      items={content.faq.map((item, index) => ({
        key: String(index),
        label: item.question,
        children: <p>{item.answer}</p>,
      }))}
    />
  </div>
);

export default Faq;
