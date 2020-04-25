import React from 'react';
import { Formik, Form } from 'formik';
import {
  Button,
  Box,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useTheme,
} from '@chakra-ui/core';
import { Document } from '@contentful/rich-text-types';
import fetch from 'isomorphic-unfetch';

import { InputField } from '../components/input-field';
import { HeroSplitContent } from '../components/hero';
import { H1 } from '../components/h1';
import { Metatags } from '../components/metatags';
import { SelectField } from '../components/select-field';
import { PageWithGlobalProps, BasePage } from '../types';
import { contentfulEntries } from '../contentful/entries';
import { GetStaticProps } from 'next';
import { createArrayFromString } from '../utils/contentful';
import { documentToReactComponents } from '../utils/documentToReactComponents';
import { getGlobalProps } from '../utils/global-props';
import { useRecaptcha } from '../hooks/use-recaptcha';

type FormStatus = '' | 'success' | 'error';

interface ConfirmationProps {
  status: FormStatus;
}

const Confirmation = (props: ConfirmationProps) => {
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const onClose = React.useCallback(() => {
    setShowConfirmation(false);
  }, []);
  const { status } = props;

  React.useEffect(() => {
    if (status === 'error' || status === 'success') {
      setShowConfirmation(true);
    }
  }, [status]);

  const title =
    status === 'error' ? 'La consulta no pudo ser enviada' : 'Consulta enviada';
  const message =
    status === 'error'
      ? 'Lo sentimos. Su consulta no ha podido ser enviada. Por favor intente más tarde o envíenos directamente un email a: hddevaperon@gmail.com'
      : 'Su consulta ha sido enviada con éxito!';

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={showConfirmation}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent maxW="90%">
        <ModalHeader>{title}:</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{message}</ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface ContactFields {
  name: string;
  email: string;
  dni: string;
  historyNum: string;
  phone: string;
  address: string;
  reason: string;
  description: string;
}

type ContactPageProps = BasePage<{
  address: Document;
  contactType: string;
  contactDescription: string;
}>;

const ContactPage: PageWithGlobalProps<ContactPageProps> = (
  props: ContactPageProps,
) => {
  const getToken = useRecaptcha('contacto');
  const theme = useTheme();

  const [formStatus, setFormStatus] = React.useState<FormStatus>('');

  const emailValidation = React.useCallback((value: string) => {
    let error;
    if (!value.trim()) {
      error = 'Email es requerido.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Por favor introduzca una dirección de email válida.';
    }

    return error;
  }, []);

  const initialValues: ContactFields = {
    name: '',
    email: '',
    dni: '',
    historyNum: '',
    phone: '',
    address: '',
    reason: '',
    description: '',
  };

  const contactType = createArrayFromString(props.pageContent.contactType);
  const contactDescription = props.pageContent.contactDescription;

  return (
    <>
      <Metatags {...props.pageContent.metatags.fields} />

      <Confirmation status={formStatus} />

      <Box pb={10}>
        <HeroSplitContent>
          <HeroSplitContent.Col
            backgroundColor="blue.100"
            padding={5}
            display="flex"
            flexDirection="column"
            alignItems={['center', 'center', 'flex-end']}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems={['flex-start']}
            >
              <Stack spacing={6}>
                <H1 textAlign="center" color="blue.900">
                  Nuestra vías de contacto
                </H1>
                <Stack as="address" spacing={2}>
                  {documentToReactComponents(props.pageContent.address)}
                </Stack>
              </Stack>
            </Box>
          </HeroSplitContent.Col>
          <HeroSplitContent.Col padding={5} maxW={['auto', 'auto', 600]}>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                const token = await getToken();

                const validation = await fetch('/api/contact', {
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  method: 'post',
                  body: JSON.stringify({
                    token,
                  }),
                }).then((r) => r.json());

                if (validation.ok) {
                  fetch(
                    'https://api.formik.com/submit/onco-covid-19/primera-vez-en-oncologia',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(values),
                    },
                  )
                    .then((resp) => resp.json())
                    .then((resp) => {
                      actions.setSubmitting(false);
                      if (resp.ok) {
                        setFormStatus('success');
                        actions.resetForm();
                      } else {
                        setFormStatus('error');
                      }
                    })
                    .catch((e) => {
                      setFormStatus('error');
                    });
                } else {
                  setFormStatus('error');
                  return;
                }
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <Stack spacing={4}>
                      <SelectField
                        id="reason"
                        name="Motivo de la consulta"
                        required
                      >
                        {contactType.map((reason: string) => {
                          return <option value={reason}>{reason}</option>;
                        })}
                      </SelectField>

                      <InputField
                        type="textarea"
                        id="description"
                        name="Descripción"
                        helpText={contactDescription}
                        required
                      />

                      <InputField id="name" name="Nombre y Apellido" required />

                      <InputField
                        id="email"
                        name="Email"
                        validate={emailValidation}
                        required
                      />

                      <InputField id="dni" name="DNI" required />

                      <InputField id="phone" name="Teléfono" required />

                      <InputField
                        id="historyNum"
                        name="Número de historia clínica (si lo recuerda)"
                      />

                      <InputField id="address" name="Dirección" />

                      <Button
                        mt={4}
                        variantColor="blue"
                        size="lg"
                        isLoading={props.isSubmitting}
                        type="submit"
                        style={{
                          background: theme.colors.blue[800],
                        }}
                      >
                        Enviar
                      </Button>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </HeroSplitContent.Col>
        </HeroSplitContent>
      </Box>
    </>
  );
};

// Workaround until _app supports getStaticProps
ContactPage.getGlobalProps = getGlobalProps;

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  const { client } = require('../contentful/client');

  const globalInfo = await client.getEntry(contentfulEntries.globalInfo);
  const entry = await client.getEntry(contentfulEntries.contacto);

  return {
    props: {
      globalInfo: {
        ...globalInfo.fields,
      },
      pageContent: {
        ...entry.fields,
      },
    },
  };
};

export default ContactPage;
