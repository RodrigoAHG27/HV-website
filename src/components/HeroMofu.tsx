import { Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { track } from '../lib/analytics';
import dayHero from '../img/SSDAY.jpeg';
import nightHero from '../img/SSNIGHT.mov';
import { useTheme } from '../theme/ThemeProvider';

const HeroMofu = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

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
        <span className="hero__trust-pill">{t('hero.trustPill')}</span>
        <Typography.Title level={1} className="hero__title hero__title--dark">
          {t('hero.title')}
        </Typography.Title>
        <Typography.Paragraph className="hero__lead hero__lead--dark">
          {t('hero.description')}
        </Typography.Paragraph>
        <div className="hero__actions hero__actions--center">
          <Button type="primary" size="large" onClick={handlePrimaryCta} className="solid-button">
            {t('hero.primaryCta')}
          </Button>
          <Button size="large" className="ghost-button" onClick={handlePrimaryCta}>
            {t('hero.secondaryCta')}
          </Button>
        </div>
        <p className="hero__contact">
          {t('hero.contactPrefix')}{' '}
          <a href="tel:+18881234567">{t('hero.contactAction')}</a>
        </p>
      </div>
    </section>
  );
};

export default HeroMofu;
