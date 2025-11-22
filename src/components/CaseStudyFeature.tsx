import { ArrowRightOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { content } from '../content/hv';
import { track } from '../lib/analytics';

const CaseStudyFeature = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tracked, setTracked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ref.current || tracked) return;
    const element = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !tracked) {
            track('mofu_case_study_view', { title: content.caseStudy.title });
            setTracked(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [tracked]);

  return (
    <div ref={ref} className="case-study">
      <div className="case-study__content">
        <p className="eyebrow">Caso destacado</p>
        <h3>{content.caseStudy.title}</h3>
        <div className="case-study__grid">
          <div>
            <p className="case-study__label">Reto</p>
            <p>{content.caseStudy.problem}</p>
            <p className="case-study__label">Solución</p>
            <p>{content.caseStudy.solution}</p>
            <button
              type="button"
              className="link-button"
              onClick={() => navigate(content.caseStudy.href)}
              aria-label="Ver más casos"
            >
              Ver más <ArrowRightOutlined />
            </button>
          </div>
          <div className="case-study__stats">
            {content.caseStudy.results.map((result) => (
              <div key={result.label} className="stat-card">
                <span className="stat-card__value">{result.value}</span>
                <span className="stat-card__label">{result.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="case-study__visual">
        <img src={content.caseStudy.image} alt={content.caseStudy.imageAlt} loading="lazy" />
        <p className="case-study__caption">{content.caseStudy.imageAlt}</p>
      </div>
    </div>
  );
};

export default CaseStudyFeature;
