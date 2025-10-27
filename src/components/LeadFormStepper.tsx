import { InboxOutlined } from '@ant-design/icons';
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
  Steps,
  Typography,
  Upload,
} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import type { FormEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { content } from '../content/hv';
import { track } from '../lib/analytics';
import {
  leadFormSchema,
  leadStep1Schema,
  leadStep2Schema,
  type LeadFormValues,
} from '../lib/validation';

const step1Fields: (keyof LeadFormValues)[] = ['name', 'email', 'phone', 'projectType', 'company'];
const LeadFormStepper = () => {
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const startedRef = useRef(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    register,
    formState: { errors },
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
      locationCity: '',
      budgetRange: '<$10k',
      startWindow: 'ASAP',
      description: '',
      fileUrls: [],
      optIn: false,
      company: '',
    },
  });

  useEffect(() => {
    track('mofu_form_step', { step: 1 });
  }, []);

  const values = watch();

  const step1Data = useMemo(
    () => ({
      name: values.name,
      email: values.email,
      phone: values.phone,
      projectType: values.projectType,
      company: values.company,
    }),
    [values.name, values.email, values.phone, values.projectType, values.company],
  );

  const step2Data = useMemo(
    () => ({
      service: values.service,
      locationCity: values.locationCity,
      budgetRange: values.budgetRange,
      startWindow: values.startWindow,
      description: values.description ?? '',
      fileUrls: values.fileUrls ?? [],
      optIn: values.optIn ?? false,
    }),
    [
      values.service,
      values.locationCity,
      values.budgetRange,
      values.startWindow,
      values.description,
      values.fileUrls,
      values.optIn,
    ],
  );

  const isStep1Valid = useMemo(() => leadStep1Schema.safeParse(step1Data).success, [step1Data]);
  const isStep2Valid = useMemo(() => leadStep2Schema.safeParse(step2Data).success, [step2Data]);

  const handleFirstFocus = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      track('mofu_form_start');
    }
  };

  const handleStepChange = (next: number) => {
    setCurrent(next);
    track('mofu_form_step', { step: next + 1 });
  };

  const onNext = async () => {
    const valid = await trigger(step1Fields);
    if (valid) {
      handleStepChange(1);
    }
  };

  const onBack = () => {
    handleStepChange(0);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (data.company && data.company.trim().length > 0) {
      messageApi.error('No pudimos enviar tu solicitud.');
      track('mofu_form_submit_error', { reason: 'honeypot' });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'mofu-page' }),
      });
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      messageApi.success('Gracias, revisaremos tu solicitud.');
      track('mofu_form_submit_success', { projectType: data.projectType });
      setSubmitted(true);
      reset();
      setFileList([]);
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
    if (current === 0) {
      event.preventDefault();
      void onNext();
      return;
    }

    void onSubmit(event);
  };

  return (
    <div id="lead-form">
      {contextHolder}
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Typography.Title level={2}>Comparte los detalles de tu proyecto</Typography.Title>
        <Steps current={current} items={[{ title: 'Datos de contacto' }, { title: 'Detalles del proyecto' }]} />
        <Form layout="vertical" onSubmitCapture={handleFormSubmit}>
          <input type="text" hidden {...register('company')} />
          {current === 0 && (
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
              <Col span={24}>
                <Space>
                  <Button type="primary" onClick={onNext} disabled={!isStep1Valid}>
                    Siguiente
                  </Button>
                </Space>
              </Col>
            </Row>
          )}
          {current === 1 && (
            <Row gutter={[16, 16]}>
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
                          { value: 'structural', label: 'Refuerzo estructural' },
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
              <Col xs={24} md={12}>
                <Controller
                  control={control}
                  name="locationCity"
                  render={({ field }) => (
                    <Form.Item
                      label="Ciudad del proyecto"
                      validateStatus={errors.locationCity ? 'error' : ''}
                      help={errors.locationCity?.message}
                    >
                      <Input {...field} onFocus={handleFirstFocus} placeholder="San Salvador" />
                    </Form.Item>
                  )}
                />
              </Col>
              <Col xs={24} md={12}>
                <Controller
                  control={control}
                  name="budgetRange"
                  render={({ field }) => (
                    <Form.Item
                      label="Presupuesto estimado"
                      validateStatus={errors.budgetRange ? 'error' : ''}
                      help={errors.budgetRange?.message}
                    >
                      <Select
                        {...field}
                        onFocus={handleFirstFocus}
                        options={[
                          { value: '<$10k', label: 'Menos de $10k' },
                          { value: '$10k–$50k', label: '$10k – $50k' },
                          { value: '$50k–$200k', label: '$50k – $200k' },
                          { value: '$200k+', label: 'Más de $200k' },
                        ]}
                      />
                    </Form.Item>
                  )}
                />
              </Col>
              <Col xs={24} md={12}>
                <Controller
                  control={control}
                  name="startWindow"
                  render={({ field }) => (
                    <Form.Item
                      label="Ventana de inicio"
                      validateStatus={errors.startWindow ? 'error' : ''}
                      help={errors.startWindow?.message}
                    >
                      <Select
                        {...field}
                        onFocus={handleFirstFocus}
                        options={[
                          { value: 'ASAP', label: 'Lo antes posible' },
                          { value: '1–3 months', label: '1 – 3 meses' },
                          { value: '3–6 months', label: '3 – 6 meses' },
                          { value: '6+ months', label: 'Más de 6 meses' },
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
                  name="fileUrls"
                  render={({ field }) => (
                    <Form.Item label="Planos o archivos (opcional)" validateStatus={errors.fileUrls ? 'error' : ''}>
                      <Upload.Dragger
                        multiple
                        fileList={fileList}
                        beforeUpload={(file) => {
                          setFileList((prev) => {
                            const next = [...prev, file];
                            field.onChange(next.map((item) => item.name));
                            return next;
                          });
                          return false;
                        }}
                        onRemove={(file) => {
                          setFileList((prev) => {
                            const next = prev.filter((item) => item.uid !== file.uid);
                            field.onChange(next.map((item) => item.name));
                            return next;
                          });
                        }}
                      >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Arrastra archivos PDF o imágenes</p>
                      </Upload.Dragger>
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
                  <Button onClick={onBack}>Regresar</Button>
                  <Button type="primary" htmlType="submit" loading={loading} disabled={!isStep2Valid}>
                    Enviar solicitud
                  </Button>
                </Space>
              </Col>
            </Row>
          )}
        </Form>
      </Space>
    </div>
  );
};

export default LeadFormStepper;
