import { content } from '../content/hv';

const ProcessSteps = () => (
  <div className="process-timeline">
    {content.process.map((step, index) => (
      <div className="process-step" key={step.title}>
        <div className="process-step__marker">{String(index + 1).padStart(2, '0')}</div>
        <div className="process-step__body">
          <h4>{step.title}</h4>
          <p>{step.description}</p>
        </div>
      </div>
    ))}
  </div>
);

export default ProcessSteps;
