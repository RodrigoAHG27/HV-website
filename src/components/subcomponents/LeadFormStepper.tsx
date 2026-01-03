import {
  Button,
  Form,
  Input,
  message,
  Result,
  Typography,
} from 'antd';
import type { FormEvent } from 'react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { leadFormSchema, LeadFormValues } from '../../lib/validation';
import { track } from '../../lib/analytics';
import { api } from '../../api/http';


const LeadFormStepper = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const startedRef = useRef(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      inquiry: '',
      company: '',
    },
  });

  const handleFirstFocus = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      track('mofu_form_start');
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (data.company && data.company.trim().length > 0) {
      messageApi.error(t('form.messages.honeypot'));
      track('mofu_form_submit_error', { reason: 'honeypot' });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() ?? '',
        inquiry: data.inquiry.trim(),
      };

      const response = await api.post('/api/leads', payload);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`status ${response.status}`);
      }

      messageApi.success(t('form.messages.submitSuccess'));
      track('mofu_form_submit_success');

      setSubmitted(true);
      reset();
    } catch (error) {
      messageApi.error(t('form.messages.submitError'));
      track('mofu_form_submit_error', {
        message: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  });

  if (submitted) {
    return (
      <>
        {contextHolder}
        <Result
          status="success"
          title={t('form.messages.resultTitle')}
          subTitle={t('form.messages.resultSubtitle')}
        />
      </>
    );
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    void onSubmit(event);
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-10">
      {contextHolder}

      {/* Header */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs uppercase tracking-widest text-red-700">
          {t('form.eyebrow')}
        </p>

        <Typography.Title level={2} className="!mb-2">
          {t('form.title')}
        </Typography.Title>

        <Typography.Paragraph className="text-black/70">
          {t('form.description')}
        </Typography.Paragraph>
      </div>

      <Form
        layout="vertical"
        onSubmitCapture={handleFormSubmit}
        className="space-y-6"
      >
        {/* Honeypot */}
        <input type="text" hidden {...register('company')} />

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Form.Item
                label={t('form.labels.fullName')}
                validateStatus={errors.name ? 'error' : ''}
                help={errors.name?.message}
              >
                <Input
                  {...field}
                  className="h-12"
                  onFocus={handleFirstFocus}
                  placeholder={t('form.placeholders.fullName')}
                />
              </Form.Item>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Form.Item
                label={t('form.labels.email')}
                validateStatus={errors.email ? 'error' : ''}
                help={errors.email?.message}
              >
                <Input
                  {...field}
                  type="email"
                  className="h-12"
                  onFocus={handleFirstFocus}
                  placeholder={t('form.placeholders.email')}
                />
              </Form.Item>
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <Form.Item
                label={t('form.labels.phone')}
                validateStatus={errors.phone ? 'error' : ''}
                help={errors.phone?.message}
                className="sm:col-span-2"
              >
                <Input
                  {...field}
                  className="h-12"
                  onFocus={handleFirstFocus}
                  placeholder={t('form.placeholders.phone')}
                />
              </Form.Item>
            )}
          />
        </div>

        {/* Inquiry */}
        <Controller
          control={control}
          name="inquiry"
          render={({ field }) => (
            <Form.Item
              label={t('form.labels.inquiry')}
              validateStatus={errors.inquiry ? 'error' : ''}
              help={errors.inquiry?.message}
            >
              <Input.TextArea
                {...field}
                onFocus={handleFirstFocus}
                placeholder={t('form.placeholders.inquiry')}
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
            </Form.Item>
          )}
        />

        {/* Footer */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-black/60">
            {t('form.requirementsNote')}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => reset()}
              className="h-12 rounded-full px-8"
            >
              {t('form.buttons.preview')}
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={!isValid}
              className="
                h-12
                rounded-full
                px-8
                !bg-red-800
                hover:!bg-red-700
              "
            >
              {t('form.buttons.submit')}
            </Button>
          </div>
        </div>
      </Form>

      <p className="mt-6 text-center text-xs text-black/50">
        {t('form.privacy')}
      </p>
    </div>
  );
};

export default LeadFormStepper;
