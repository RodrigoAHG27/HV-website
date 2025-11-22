import {
  Button,
  Form,
  Input,
  message,
  Result,
  Select,
  Typography,
} from 'antd';
import type { FormEvent } from 'react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { api } from '../api/http';
import { track } from '../lib/analytics';
import { leadFormSchema, type LeadFormValues } from '../lib/validation';

const LeadFormStepper = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const startedRef = useRef(false);
  const [messageApi, contextHolder] = message.useMessage();

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
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyName: '',
      companySize: '1-10',
      projectType: 'commercial',
      service: 'other',
      message: '',
      optIn: false,
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
      messageApi.error('No pudimos enviar tu solicitud.');
      track('mofu_form_submit_error', { reason: 'honeypot' });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        phone: data.phone,
        projectType: data.projectType,
        service: data.service,
        description: data.message,
        optIn: data.optIn,
        company: data.company,
        companyName: data.companyName,
        companySize: data.companySize,
      };

      const response = await api.post('/api/leads', {
        ...payload,
        source: 'mofu-page',
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`status ${response.status}`);
      }

      messageApi.success('Gracias, revisaremos tu solicitud.');
      track('mofu_form_submit_success', { projectType: data.projectType });
      setSubmitted(true);
      reset();
    } catch (error) {
      messageApi.error('No pudimos enviar tu solicitud.');
      track('mofu_form_submit_error', { message: (error as Error).message });
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
          title="Tu solicitud fue enviada"
          subTitle="Nuestro equipo responderá en menos de un día hábil."
        />
      </>
    );
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    void onSubmit(event);
  };

  return (
    <div id="lead-form" className="lead-form">
      {contextHolder}
      <div className="lead-form__header">
        <p className="eyebrow">Ready to Get Started?</p>
        <Typography.Title level={2}>Share your details and we&apos;ll reach out</Typography.Title>
        <Typography.Paragraph>
          Complete the form and our team will contact you within 24 hours to discuss how we can help achieve your goals.
        </Typography.Paragraph>
      </div>
      <Form layout="vertical" onSubmitCapture={handleFormSubmit} className="lead-form__card">
        <input type="text" hidden {...register('company')} />
        <input type="hidden" {...register('projectType')} />
        <input type="hidden" {...register('service')} />
        <div className="lead-form__grid">
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <Form.Item label="First Name *" validateStatus={errors.firstName ? 'error' : ''} help={errors.firstName?.message}>
                <Input {...field} onFocus={handleFirstFocus} placeholder="John" />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <Form.Item label="Last Name *" validateStatus={errors.lastName ? 'error' : ''} help={errors.lastName?.message}>
                <Input {...field} onFocus={handleFirstFocus} placeholder="Doe" />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Form.Item label="Email Address *" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                <Input {...field} type="email" onFocus={handleFirstFocus} placeholder="john@company.com" />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <Form.Item label="Phone Number *" validateStatus={errors.phone ? 'error' : ''} help={errors.phone?.message}>
                <Input {...field} onFocus={handleFirstFocus} placeholder="+1 (555) 000-0000" />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="companyName"
            render={({ field }) => (
              <Form.Item
                label="Company Name *"
                validateStatus={errors.companyName ? 'error' : ''}
                help={errors.companyName?.message}
              >
                <Input {...field} onFocus={handleFirstFocus} placeholder="Your Company Inc." />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="companySize"
            render={({ field }) => (
              <Form.Item
                label="Company Size *"
                validateStatus={errors.companySize ? 'error' : ''}
                help={errors.companySize?.message}
              >
                <Select
                  {...field}
                  onFocus={handleFirstFocus}
                  options={[
                    { value: '1-10', label: '1-10' },
                    { value: '11-50', label: '11-50' },
                    { value: '51-200', label: '51-200' },
                    { value: '201-500', label: '201-500' },
                    { value: '500+', label: '500+' },
                  ]}
                  placeholder="Select company size"
                />
              </Form.Item>
            )}
          />
        </div>
        <Controller
          control={control}
          name="message"
          render={({ field }) => (
            <Form.Item label="How can we help?" validateStatus={errors.message ? 'error' : ''} help={errors.message?.message}>
              <Input.TextArea
                {...field}
                onFocus={handleFirstFocus}
                placeholder="Tell us about your project, goals, or any questions you have..."
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
            </Form.Item>
          )}
        />
        <div className="lead-form__footer">
          <div className="lead-form__requirements">* Required fields</div>
          <div className="lead-form__actions">
            <Button onClick={() => reset()} className="ghost-button">
              Preview
            </Button>
            <Button type="primary" htmlType="submit" loading={loading} disabled={!isValid} className="solid-button">
              Submit Request
            </Button>
          </div>
        </div>
      </Form>
      <p className="lead-form__privacy">
        We respect your privacy. Your information will never be shared with third parties.
      </p>
    </div>
  );
};

export default LeadFormStepper;
