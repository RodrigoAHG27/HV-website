import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import LeadFormStepper from '../components/subcomponents/LeadFormStepper';

const FormPage = () => {
  const { t } = useTranslation();

  return (
    <main className="page">
      <div className="page__inner">
        <div className="page__intro">
          <Typography.Title level={1}>{t('form.title')}</Typography.Title>
          <Typography.Paragraph>{t('form.description')}</Typography.Paragraph>
        </div>
        <LeadFormStepper />
      </div>
    </main>
  );
};

export default FormPage;
