import { content } from '../content/hv';

const FooterCompact = () => (
  <footer className="footer">
    <div className="container footer__inner">
      <div>
        <p className="eyebrow">{content.companyName}</p>
        <strong>{content.companyName}</strong>
        <p>Operamos en San Salvador y municipios aledaños.</p>
      </div>
      <p className="footer__meta">© {new Date().getFullYear()} {content.companyName}</p>
    </div>
  </footer>
);

export default FooterCompact;
