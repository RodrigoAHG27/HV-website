import { Button, Card, Checkbox, Form, Input, message, Result, Select, Typography } from 'antd';
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
      name: '',
      email: '',
      phone: '',
      projectType: 'commercial',
      service: 'other',
      description: '',
      optIn: false,
      company: '',
      source: 'mofu-page',
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
        name: data.name.trim(),
        email: data.email,
        phone: data.phone,
        projectType: data.projectType,
        service: data.service,
        description: data.description,
        optIn: data.optIn,
        company: data.company,
      };

      const response = await api.post('/api/leads', {
        ...payload,
        source: data.source,
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
    <Card id="lead-form" className="lead-form" bordered>
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
        <input type="hidden" {...register('source')} />
        <div className="lead-form__grid">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Form.Item label="Full Name *" validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
                <Input {...field} onFocus={handleFirstFocus} placeholder="John Doe" />
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
              <Form.Item label="Phone Number" validateStatus={errors.phone ? 'error' : ''} help={errors.phone?.message}>
                <Input {...field} onFocus={handleFirstFocus} placeholder="+1 (555) 000-0000" />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="projectType"
            render={({ field }) => (
              <Form.Item label="Project Type *" validateStatus={errors.projectType ? 'error' : ''} help={errors.projectType?.message}>
                <Select
                  {...field}
                  onFocus={handleFirstFocus}
                  options={[
                    { value: 'residential', label: 'Residential' },
                    { value: 'commercial', label: 'Commercial' },
                    { value: 'industrial', label: 'Industrial' },
                  ]}
                  placeholder="Select project type"
                />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="service"
            render={({ field }) => (
              <Form.Item label="Service *" validateStatus={errors.service ? 'error' : ''} help={errors.service?.message}>
                <Select
                  {...field}
                  onFocus={handleFirstFocus}
                  options={[
                    { value: 'remodel', label: 'Remodel' },
                    { value: 'new_build', label: 'New Build' },
                    { value: 'roofing', label: 'Roofing' },
                    { value: 'electrical', label: 'Electrical' },
                    { value: 'plumbing', label: 'Plumbing' },
                    { value: 'finishes', label: 'Finishes' },
                    { value: 'other', label: 'Other' },
                  ]}
                  placeholder="Select a service"
                />
              </Form.Item>
            )}
          />
        </div>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Form.Item label="How can we help?" validateStatus={errors.description ? 'error' : ''} help={errors.description?.message}>
              <Input.TextArea
                {...field}
                onFocus={handleFirstFocus}
                placeholder="Tell us about your project, goals, or any questions you have..."
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="optIn"
          render={({ field }) => (
            <Form.Item valuePropName="checked">
              <Checkbox
                checked={field.value}
                onChange={(event) => field.onChange(event.target.checked)}
                onBlur={field.onBlur}
                onFocus={handleFirstFocus}
                ref={field.ref}
              >
                I agree to receive communications from HV.
              </Checkbox>
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
    </Card>
  );
};

export default LeadFormStepper;
