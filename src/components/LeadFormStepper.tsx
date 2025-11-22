import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Result,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import type { FormEvent } from 'react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { api } from '../api/http';
import { content } from '../content/hv';
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
      projectType: 'residential',
      service: 'remodel',
      description: '',
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
      const response = await api.post('/api/leads', {
        ...data,
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
          extra={
            <Button type="primary" href={content.pdfUrl} onClick={() => track('mofu_pdf_download')}>
              Descargar hoja de capacidad
            </Button>
          }
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
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div className="section-header">
          <p className="eyebrow">Compártenos los detalles</p>
          <Typography.Title level={2}>Planifiquemos tu próximo proyecto</Typography.Title>
          <Typography.Paragraph>
            Define el alcance y coordinamos una visita técnica en menos de 48 horas dentro del Gran San Salvador.
          </Typography.Paragraph>
        </div>
        <Form layout="vertical" onSubmitCapture={handleFormSubmit} className="lead-form__card">
          <input type="text" hidden {...register('company')} />
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Form.Item label="Nombre completo" validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
                    <Input {...field} onFocus={handleFirstFocus} placeholder="Nombre y apellido" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col xs={24} md={12}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Form.Item label="Correo electrónico" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                    <Input {...field} type="email" onFocus={handleFirstFocus} placeholder="nombre@empresa.com" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col xs={24} md={12}>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <Form.Item label="Teléfono" validateStatus={errors.phone ? 'error' : ''} help={errors.phone?.message}>
                    <Input {...field} onFocus={handleFirstFocus} placeholder="+503 2222-2222" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col xs={24} md={12}>
              <Controller
                control={control}
                name="projectType"
                render={({ field }) => (
                  <Form.Item
                    label="Tipo de proyecto"
                    validateStatus={errors.projectType ? 'error' : ''}
                    help={errors.projectType?.message}
                  >
                    <Select
                      {...field}
                      onFocus={handleFirstFocus}
                      options={[
                        { value: 'residential', label: 'Residencial' },
                        { value: 'commercial', label: 'Comercial' },
                        { value: 'industrial', label: 'Industrial' },
                      ]}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col xs={24} md={12}>
              <Controller
                control={control}
                name="service"
                render={({ field }) => (
                  <Form.Item label="Servicio requerido" validateStatus={errors.service ? 'error' : ''} help={errors.service?.message}>
                    <Select
                      {...field}
                      onFocus={handleFirstFocus}
                      options={[
                        { value: 'remodel', label: 'Remodelación' },
                        { value: 'new_build', label: 'Nueva construcción' },
                        { value: 'roofing', label: 'Cubiertas y techos' },
                        { value: 'electrical', label: 'Instalaciones eléctricas' },
                        { value: 'plumbing', label: 'Instalaciones hidráulicas' },
                        { value: 'finishes', label: 'Acabados' },
                        { value: 'other', label: 'Otro' },
                      ]}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Form.Item
                    label="Descripción del proyecto"
                    validateStatus={errors.description ? 'error' : ''}
                    help={errors.description?.message}
                  >
                    <Input.TextArea
                      {...field}
                      onFocus={handleFirstFocus}
                      placeholder="Cuéntanos sobre alcance, planos y restricciones"
                      autoSize={{ minRows: 4, maxRows: 6 }}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                control={control}
                name="optIn"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    onFocus={handleFirstFocus}
                  >
                    Deseo recibir actualizaciones por correo electrónico
                  </Checkbox>
                )}
              />
            </Col>
            <Col span={24}>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading} disabled={!isValid}>
                  Enviar solicitud
                </Button>
                <Button type="link" onClick={handleFirstFocus} href={`tel:${content.contact.phone.replace(/[^+\d]/g, '')}`}>
                  Llamar ahora
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Space>
    </div>
  );
};

export default LeadFormStepper;
