import { Select, Tooltip } from 'antd';

import { useI18n, type Language } from '../i18n/I18nProvider';

const LANGUAGE_OPTIONS: { label: string; value: Language }[] = [
  { label: 'EN', value: 'en' },
  { label: 'ES', value: 'es' },
];

const LanguageToggle = () => {
  const { language, setLanguage, t } = useI18n();

  return (
    <Tooltip title={t('languageToggleLabel')} placement="left">
      <Select
        value={language}
        onChange={(value) => setLanguage(value)}
        options={LANGUAGE_OPTIONS}
        size="small"
        className="language-toggle"
        aria-label="Switch language"
      />
    </Tooltip>
  );
};

export default LanguageToggle;
