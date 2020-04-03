import { css } from '@emotion/core';
import styled from '@emotion/styled';
import useDebouncedCallback from '@src/hooks/useDebouncedCallback';
import { withProperties } from '@src/utils/type';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Controller,
  ErrorMessage,
  FormContext,
  FormStateProxy,
  useForm,
  useFormContext,
  FormContextValues,
} from 'react-hook-form';
import { useId } from 'react-id-generator';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import tw from 'tailwind.macro';
import * as yup from 'yup';

import Button from '../Button';

yup.setLocale({
  mixed: {
    default: 'This field is invalid.',
    required: 'This field is required.',
  },
  string: {
    email: 'Please provide a valid email address.',
    url: 'Please provide a valid URL.',
  },
});

enum SubmitMode {
  onSubmitButton = 'onSubmitButton',
  onChangeDebounced = 'onChangeDebounced',
}

type Value = string | number | boolean | DefaultValues;
interface DefaultValues {
  [key: string]: Value | Value[];
}

export interface FormProps {
  className?: string;
  children?: any;
  /**  Specify when onSubmit is called. */
  submitMode?: SubmitMode;
  onSubmit?: (
    values: any,
    defaultValues?: any,
    formState?: FormStateProxy,
    formHandlers?: FormContextValues<any>
  ) => any;
  validationSchema?: yup.ObjectSchema;
  defaultValues?: any;
  mode?: 'onBlur' | 'onSubmit' | 'onChange' | undefined;
}

interface FormComponent extends React.FC<FormProps> {
  Field: any;
  ErrorMessage: React.FC<any>;
  Status: React.FC<any>;
}

interface Errors {
  [key: string]: string;
}

interface FormOptions {
  submitMode?: SubmitMode;
  onSubmit?: (
    values: any,
    defaultValues?: any,
    formState?: FormStateProxy,
    formHandlers?: FormContextValues<any>
  ) => any;
  formId: string;
}

export const FormOptionsContext = React.createContext<FormOptions | any>({});

const Form: FormComponent = ({
  mode = 'onSubmit',
  validationSchema,
  submitMode = SubmitMode.onSubmitButton,
  defaultValues = {},
  ...props
}: FormProps) => {
  const formHandlers = useForm<any>({
    mode,
    validationSchema,
    defaultValues,
  });

  React.useEffect(() => {
    if (defaultValues) {
      formHandlers.reset(defaultValues);
    }
  }, [formHandlers.reset, JSON.stringify(defaultValues)]);

  const onSubmit = formHandlers.handleSubmit(async (values) => {
    // const values = formHandlers.getValues({ nest: true })
    try {
      // values && formHandlers.reset(flatObject(values))
      props.onSubmit &&
        (await props.onSubmit(values, defaultValues, formHandlers.formState, formHandlers));
      const formValues = formHandlers.getValues({ nest: true });
      formHandlers.reset(formValues);
    } catch (e) {
      console.warn('Form onSubmit error: ', e);
      if (e instanceof SubmitError && e.errors) {
        Object.keys(e.errors).map((name) => formHandlers.setError(name, 'error', e.errors[name]));
      } else {
        formHandlers.setError('_', 'error', e.toString());
      }
    }
  });

  const formRef = React.useRef<HTMLFormElement>(null);
  const [formId] = useId();
  return (
    <FormOptionsContext.Provider value={{ submitMode, onSubmit, formId }}>
      <FormContext {...formHandlers}>
        <form {...props} id={formId} children={props.children} onSubmit={onSubmit} ref={formRef} />
      </FormContext>
    </FormOptionsContext.Provider>
  );
};

export class SubmitError extends Error {
  errors: Errors;

  constructor(errors: Errors) {
    super('SubmitError');
    this.name = 'SubmitError'; // (2)
    this.errors = errors;
  }
}

interface FieldProps {
  name: string;
  component: any;
  errors: any;
  registerOptions?: any;
  onChange?: any;
  className?: string;
}
Form.Field = styled(
  ({ name, className, component, registerOptions, errors, ...props }: FieldProps) => {
    return (
      <div className={`${className}`}>
        <Form.Field.Input {...props} name={name} component={component} onChange={props.onChange} />
        <ErrorMessage errors={errors} name={name}>
          {({ message }: any) => {
            return (
              <Label basic color='red' pointing>
                {message}
              </Label>
            );
          }}
        </ErrorMessage>
      </div>
    );
  }
)``;

Form.Field.Input = styled(({ component, errorMessage, inputRef, ...props }: any) => {
  const { onSubmit, submitMode } = React.useContext(FormOptionsContext);
  const formHandlers = useFormContext();

  const onSubmitDebounced = useDebouncedCallback(async () => {
    // const values = formHandlers.getValues({ nest: true })
    submitMode === SubmitMode.onChangeDebounced && (await onSubmit());
  });

  const { control } = formHandlers;

  const onChange = (args: any[]) => {
    const e = args[0];
    const data = args[1];
    let value;

    if (data) {
      value = data.value;
    } else {
      if (e === undefined) return;
      value = e.target ? e.target.value : e;
    }

    onSubmitDebounced();
    props.onChange && props.onChange(value);
    return value;
  };

  return (
    <Controller
      {...props}
      onChange={onChange}
      as={component}
      control={control}
      {...(inputRef ? { inputRef } : {})}
    />
  );
})`
  ${({ errorMessage }) => errorMessage && tw`border-coral-1 rounded border-2 text-coral-1`}
`;

interface SubmitButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  dirtyText?: string;
  cleanText?: string;
  children?: any;
  containerId?: string;
  className?: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = (props: SubmitButtonProps) => {
  const formContext = useFormContext();
  const { formState } = formContext;
  const { formId } = React.useContext(FormOptionsContext);

  const cleanText = props.cleanText || props.children || 'Publish';
  const dirtyText = props.dirtyText || props.children || 'Save changes';
  const { isSubmitting, dirty, isValid, isSubmitted } = formState;

  const disabled = props.disabled || isSubmitting || (!dirty && !isValid && isSubmitted);
  const children = (
    <Button.blueRounded
      {...props}
      css={css`
        min-width: 8rem;
        min-height: 2rem;
        whitespace-no-wrap
      `}
      className={`${props.className}`}
      type='submit'
      form={formId}
      disabled={disabled}
    >
      {!isSubmitting && !dirty && <div className='m-auto'>{cleanText}</div>}
      {!isSubmitting && dirty && <div className='m-auto'>{dirtyText}</div>}
      <img
        alt='spinning'
        className={`w-5 m-auto ${isSubmitting ? 'block' : 'hidden'}`}
        src={require('@src/images/spinnerWhite.svg').default}
      />
    </Button.blueRounded>
  );
  if (props.containerId) {
    const el = document.getElementById(props.containerId);

    return el ? ReactDOM.createPortal(children, el) : null;
  } else {
    return children;
  }
};

Form.ErrorMessage = () => {
  return (
    <ErrorMessage name={'_'}>
      {({ message }: any) => {
        return <div className='text-coral-1 my-2'>{message}</div>;
      }}
    </ErrorMessage>
  );
};

Form.Status = (props: { className?: string }) => {
  const { formState } = useFormContext();
  const { isSubmitted, dirty, isValid } = formState;
  const isSaved = !dirty && isSubmitted && isValid;

  return (
    <div
      css={css`
        ${!isSaved && tw`opacity-0`}
      `}
      className={`flex items-center bg-blue-1 text-blue-3 rounded-full py-2 px-3 transition-color transition-500 ${props.className}`}
    >
      <img alt='check' className='pr-2 h-6' src={require('@src/images/check.svg').default} />
      Changes saved!
    </div>
  );
};

export default withProperties(Form, { SubmitMode, SubmitButton });
