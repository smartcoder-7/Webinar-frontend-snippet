import { Form, Modal, Text } from '@src/components/ui';
import { FormProps, SubmitError } from '@src/components/ui/Form';
import { ApolloError } from 'apollo-boost';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { globalHistory, HistoryListenerParameter } from '@reach/router';

interface Errors {
  [name: string]: string;
}

interface ValidationError {
  property: string;
  constraints: {
    [name: string]: string;
  };
}

function throwError(e: ApolloError): any {
  const error = e.graphQLErrors[0];

  if (
    error.extensions &&
    error.extensions.exception &&
    error.extensions.exception.validationErrors
  ) {
    const errors = error.extensions.exception.validationErrors.reduce(
      (errors: Errors, validationError: ValidationError) => {
        const errorMessageKey = Object.keys(validationError.constraints)[0];
        const errorMessage = errorMessageKey && validationError.constraints[errorMessageKey];
        return {
          ...errors,
          [validationError.property]: errorMessage,
        };
      },
      {}
    );

    throw new SubmitError(errors);
  }

  if (error.message) {
    throw new SubmitError({
      _: error.message,
    });
  }
}

const useOnLocationChange = (cb: (listener: HistoryListenerParameter) => any, deps: any[]) => {
  React.useEffect(() => {
    const removeListener = globalHistory.listen((listener) => {
      if (listener.action === 'PUSH') {
        cb(listener);
      }
    });

    return () => removeListener();
  }, deps || []);
};

const useBeforeUnloadBrowserDialog = (enabled: boolean) => {
  React.useEffect(() => {
    window.onbeforeunload = enabled ? null : () => true;
  }, [enabled]);
  return null;
};

const UnsavedChangesDialog = () => {
  const formHandlers = useFormContext();
  const { formState } = formHandlers;
  const { dirty } = formState;
  useBeforeUnloadBrowserDialog(dirty);
  const [isOpen, setIsOpen] = React.useState(false);

  useOnLocationChange(() => {
    if (dirty) {
      setIsOpen(true);
    }
  }, [dirty]);

  return isOpen ? (
    <Modal>
      <Modal.Close onClick={() => setIsOpen(false)} />
      <Modal.Title>Save your changes?</Modal.Title>
      <Modal.Body>
        <Text.body>
          Changes you made have not been saved. Would you like to save your changes?
          <Form.SubmitButton dirtyText='Save changes' cleanText='Save changes' />
        </Text.body>
      </Modal.Body>
    </Modal>
  ) : null;
};

const ApolloForm: React.FC<FormProps & {
  showUnsavedChangesDialog?: boolean;
}> = (props) => {
  const context = useFormContext();

  return (
    <Form
      {...props}
      onSubmit={async (values, defaultValues) => {
        try {
          props.onSubmit && (await props.onSubmit(values, defaultValues));
        } catch (e) {
          console.error('Apollo Form: ', e);
          if (e.graphQLErrors) throwError(e);
        }
      }}
    >
      {props.showUnsavedChangesDialog && context?.formState.dirty && <UnsavedChangesDialog />}
      <Form.Field name='id' component='input' type='hidden' />

      {props.children}
    </Form>
  );
};

export default ApolloForm;
