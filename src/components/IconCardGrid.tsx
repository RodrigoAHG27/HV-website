import { BankOutlined, BuildOutlined, HomeOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';

import { content } from '../content/hv';

const iconMap: Record<string, ReactNode> = {
  HomeOutlined: <HomeOutlined />,
  BankOutlined: <BankOutlined />,
  BuildOutlined: <BuildOutlined />,
};

const IconCardGrid = () => (
  <div className="pillars-grid">
    {content.iconCards.map((card) => (
      <article className="pillar-card" key={card.title}>
        <div className="pillar-card__icon">{iconMap[card.icon]}</div>
        <div className="pillar-card__content">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      </article>
    ))}
  </div>
);

export default IconCardGrid;
