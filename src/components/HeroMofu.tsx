import { Button, Typography } from 'antd';

import { track } from '../lib/analytics';
import dayHero from '../img/SSDAY.jpeg';
import nightHero from '../img/SSNIGHT.mov';
import { useTheme } from '../theme/ThemeProvider';

const HeroMofu = () => {
  const { isDark } = useTheme();

  const handlePrimaryCta = () => {
    track('mofu_hero_cta_click');
    const form = document.getElementById('lead-form');
    form?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className={`hero ${isDark ? 'hero--dark' : 'hero--light'}`}>
      <div className="hero__media" aria-hidden>
        {isDark ? (
          <video className="hero__video" autoPlay loop muted playsInline>
            <source src={nightHero} type="video/quicktime" />
          </video>
        ) : (
          <img src={dayHero} alt="" className="hero__image" loading="lazy" />
        )}
      </div>
      <div className="hero__backdrop" />
      <div className="container hero__content hero__content--center">
        <span className="hero__trust-pill">Trusted by 500+ Companies</span>
        <Typography.Title level={1} className="hero__title hero__title--dark">
          Transform Your Business with Expert Solutions
        </Typography.Title>
        <Typography.Paragraph className="hero__lead hero__lead--dark">
          We help forward-thinking companies accelerate growth, streamline operations, and achieve measurable results. Let&apos;s
          discuss how we can help you reach your goals.
        </Typography.Paragraph>
        <div className="hero__actions hero__actions--center">
          <Button type="primary" size="large" onClick={handlePrimaryCta} className="solid-button">
            Get Started Today
          </Button>
          <Button size="large" className="ghost-button" onClick={handlePrimaryCta}>
            Schedule a Consultation
          </Button>
        </div>
        <p className="hero__contact">
          Prefer to discuss? <a href="tel:+18881234567">Call us at +1 (888) 123-4567</a>
        </p>
      </div>
    </section>
  );
};

export default HeroMofu;
