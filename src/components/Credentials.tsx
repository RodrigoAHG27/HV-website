import { content } from '../content/hv';

const Credentials = () => (
  <div className="credentials">
    <div className="credential-card">
      <p className="eyebrow">Licencias y seguros</p>
      <h4>{content.credentials.license}</h4>
      <p>{content.credentials.insurance}</p>
    </div>
    <div className="credential-card">
      <p className="eyebrow">Acreditaciones</p>
      <ul>
        {content.credentials.badges.map((badge) => (
          <li key={badge.name}>
            <span className="badge-dot" />
            <div>
              <strong>{badge.name}</strong>
              <p>{badge.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Credentials;
