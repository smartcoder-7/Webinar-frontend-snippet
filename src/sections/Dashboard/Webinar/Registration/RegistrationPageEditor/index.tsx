import React, { useState } from 'react';
import SEO from '@src/components/SEO';
import { navigate } from '@reach/router';
import tw from 'tailwind.macro';
import { useFormContext } from 'react-hook-form';
import { css } from '@emotion/core';
import { ReactComponent as ImageUploadIcon } from '@src/images/imageUpload.svg';
import Logo from '@src/components/Logo';
import RegisterNow from '@src/components/RegisterNow';
import { Form, Input } from '@src/components/ui';
import { ReactComponent as CheckCircle } from '@src/images/checkCircle.svg';
import PageBuilder from '@src/sections/Dashboard/Webinar/Registration/PageBuilder';
import { PageBuilderModes, PageBuilderProps } from '@src/sections/Dashboard/Webinar/Registration';
import ApolloForm from '@src/components/ApolloForm';
import config from '@src/config';
import { EWebinarFragment, useUpdateEwebinarMutation } from '@src/fromBackend/schema';
import ThemesNavBar from '@src/components/ui/ThemesNavBar';

interface Props {
  mode: PageBuilderModes;
  ewebinar: EWebinarFragment;
}

const onRegisterClick = (mode: PageBuilderModes, ewebinar: EWebinarFragment) => {
  if (mode === 'edit') {
    return;
  }

  if (mode === 'preview') {
    navigate(`/portal/webinar/${ewebinar.id}/registration/form`);
    return;
  }

  navigate(`/webinar/${ewebinar.set.id}/register/form`);
};

const HeaderSection = ({ mode, ewebinar }: Props) => {
  const { id, ...values } = useFormContext().getValues();
  const { setValue } = useFormContext();
  const ewebinarId = id;

  const primaryColor = useFormContext().watch('primaryColor');

  return (
    <div>
      <div className='container mx-auto flex p-4 items-center bg-gray-7'>
        <div className='w-full flex justify-between items-center'>
          <PageBuilder.Image
            name='logoMediaUrl'
            asset={{
              scope: 'ewebinar',
              name: 'logo',
              id: ewebinarId,
            }}
            imgProps={{
              style: { padding: '0', maxHeight: '4em', maxWidth: '20vw' },
            }}
            placeholder={
              <div className='text-coral-1 text-center flex items-center justify-center cursor-pointer'>
                <ImageUploadIcon className='flex w-8 h-8' />
                <span className='max-w-48 p-2 underline'>Add a logo here</span>
              </div>
            }
            mode={mode}
          />
          <div className='flex items-center'>
            <Form.Field.Input
              name='registrationPageSettings.headerSection.teaserText'
              mode={mode}
              data-text='Add teaser text here?'
              component={PageBuilder.TextEdit}
            />
            <RegisterNow
              onClick={() => onRegisterClick(mode, ewebinar)}
              setId={ewebinar.set.id}
              name='registrationPageSettings.headerSection.ctaTopBtnText'
              mode={mode}
              css={css`
                background-color: ${primaryColor} !important;
              `}
              className='ml-6 text-sm whitespace-no-wrap'
            />
          </div>
        </div>
      </div>
      <div className='container mx-auto p-4 bg-white flex items-center'>
        <div className='w-6/12 pr-6'>
          <Form.Field.Input
            name='registrationPageSettings.headerSection.title'
            mode={mode}
            defaultValue={values.title}
            component={PageBuilder.TextEdit}
            data-text='Title of your eWebinar'
            className='font-bold outline-none mb-6 text-5xl'
            css={{ color: '#323648', lineHeight: '3.75rem', fontFamily: 'CircularStd' }}
          />
          <Form.Field.Input
            name='registrationPageSettings.headerSection.subtitle'
            mode={mode}
            data-text='Add a subtitle here?'
            component={PageBuilder.TextEdit}
            className='text-xl outline-none mb-6 pr-4 leading-normal'
            css={{ color: '#5B5E6D' }}
          />

          <RegisterNow
            skipAttendeeCreate
            onClick={() => onRegisterClick(mode, ewebinar)}
            setId={ewebinar.set.id}
            mode={mode}
            css={css`
              background-color: ${primaryColor} !important;
              width: '230px';
              height: '60px';
            `}
            className='min-w-5/12 whitespace-no-wrap'
            name='registrationPageSettings.headerSection.ctaBtnText'
          />
        </div>
        <div className={`w-6/12 ${mode == 'edit' && 'self-start'}`}>
          <PageBuilder.Image
            name='registrationPageSettings.headerSection.mainMediaUrl'
            asset={{
              scope: 'ewebinar',
              name: 'headerSection.mediaAsset',
              id: ewebinarId,
            }}
            imgProps={{
              style: { minWidth: '22rem', maxWidth: '28rem' },
            }}
            setValue={setValue}
            hasYoutubeLink
            mode={mode}
            className='w-full p-4 justify-center items-center'
          />
        </div>
      </div>
    </div>
  );
};

const DescriptionSection = ({ mode }: Props) => {
  const { watch, setValue, ...context } = useFormContext();
  const ewebinarId = context.getValues().id;
  const isActive = watch('registrationPageSettings.descriptionBlockSection.active');
  if (isActive === false) return null;

  return (
    <div className='container mx-auto p-4 py-8 bg-white flex items-center'>
      <div className='w-6/12'>
        <PageBuilder.Image
          name='registrationPageSettings.descriptionBlockSection.mainMediaUrl'
          asset={{
            scope: 'ewebinar',
            name: 'descriptionBlockSection.mediaAsset',
            id: ewebinarId,
          }}
          setValue={setValue}
          hasYoutubeLink
          mode={mode}
          css={[tw`block w-full p-4 self-stretch`]}
        />
      </div>
      <div className='w-7/12 pl-8'>
        <Form.Field.Input
          name='registrationPageSettings.descriptionBlockSection.title'
          mode={mode}
          component={PageBuilder.TextEdit}
          data-text='Description area title goes here'
          className='text-4xl leading-tight outline-none mb-6'
        />
        <Form.Field.Input
          name='registrationPageSettings.descriptionBlockSection.description'
          mode={mode}
          component={PageBuilder.TextEdit}
          data-text='Enter a description of your eWebinar here'
          className='text-lg outline-none mb-6'
        />
      </div>
    </div>
  );
};

const PresentersSection = ({ mode }: Props) => {
  console.log(
    'PresentersSection: ',
    useFormContext().getValues().id,
    ' ',
    useFormContext().getValues()
  );

  const { getValues, setValue } = useFormContext();
  const values = getValues({ nest: true });
  const ewebinarId = getValues().id;
  const presenters = (values.presentersSection && values.presentersSection.presenters) || [
    null,
    null,
    null,
  ];

  const { watch } = useFormContext();
  const isActive = watch('registrationPageSettings.presentersSection.active');
  if (isActive === false) return null;

  return (
    <div className='flex p-8 py-10 items-center bg-blue-2'>
      <div className='container mx-auto flex flex-col items-center w-full'>
        <Form.Field.Input
          name={`registrationPageSettings.presentersSection.title`}
          data-text='Presenting...'
          mode={mode}
          component={PageBuilder.TextEdit}
          className='inline-block text-center text-white w-2/3 text-3xl leading-tight outline-none mb-10'
        />
        <div className='flex justify-center items-start w-full'>
          {presenters.map((presenter: any, index: number) =>
            mode === 'edit' ||
            ['title', 'description'].some((name) => presenter && presenter[name]) ? (
              <div key={index} className='w-1/3 p-6'>
                <Form.Field.Input
                  name={`registrationPageSettings.presentersSection.presenters.${index}.avatarMediaUrl`}
                  asset={{
                    scope: 'ewebinar',
                    name: `registrationPageSettings.presentersSection.presenters.${index}.avatar`,
                    id: ewebinarId,
                  }}
                  mode={mode}
                  component={PageBuilder.Avatar}
                  className='mb-2'
                />
                <div className='relative'>
                  {mode === 'edit' && (
                    <button
                      onClick={(e: any) => {
                        e.stopPropagation();
                        e.preventDefault();

                        setValue(
                          `registrationPageSettings.presentersSection.presenters.${index}.name`,
                          null
                        );
                        setValue(
                          `registrationPageSettings.presentersSection.presenters.${index}.description`,
                          null
                        );
                      }}
                      className='z-50 cursor-pointer outline-none appearence-none shadow absolute bg-coral-1 top-0 right-0 rounded-full w-6 h-6 -mt-3 -mr-3 flex items-center justify-center text-white text-xs'
                    >
                      ✕
                    </button>
                  )}
                  <Form.Field.Input
                    name={`registrationPageSettings.presentersSection.presenters.${index}.name`}
                    data-text="Presenter's name"
                    mode={mode}
                    component={PageBuilder.TextEdit}
                    className='ml-auto text-xl outline-none mb-2'
                  />
                  <Form.Field.Input
                    name={`registrationPageSettings.presentersSection.presenters.${index}.description`}
                    data-text='Optionally, enter a biographical text for this presenter.'
                    mode={mode}
                    component={PageBuilder.TextEdit}
                    className='ml-auto min-h-32 text-lg outline-none '
                  />
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

const ReasonsSection = ({ mode }: Props) => {
  const { watch, setValue, ...context } = useFormContext();
  const ewebinarId = context.getValues().id;
  const isActive = watch('registrationPageSettings.reasonsSection.active');

  const { getValues } = useFormContext();
  const values = getValues({ nest: true });
  const reasons = (values.reasonsSection && values.reasonsSection.reasons) || [null, null, null];

  if (isActive === false) return null;

  return (
    <div className='container mx-auto p-4 py-8 bg-white flex items-center bg-gray-7'>
      <div className='w-7/12 p-4 pt-0'>
        <Form.Field.Input
          name='registrationPageSettings.reasonsSection.title'
          mode={mode}
          data-text='Why you should join the Webinar'
          component={PageBuilder.TextEdit}
          className='text-3xl leading-tight outline-none mb-6'
        />
        {reasons.map(
          (reason: any, index: number) =>
            ((reason && reason.content) || mode === 'edit') && (
              <div key={index} className='flex my-2'>
                <CheckCircle className='mr-4 flex-shrink-0 h-5 w-5' />
                <Form.Field.Input
                  name={`registrationPageSettings.reasonsSection.reasons.${index}.content`}
                  placeholder=''
                  mode={mode}
                  data-text='Add a reason here'
                  component={PageBuilder.TextEdit}
                  className='text-lg outline-none mb-6 leading-none'
                />
              </div>
            )
        )}
      </div>
      <div className='w-6/12'>
        <PageBuilder.Image
          name='registrationPageSettings.reasonsSection.mainMediaUrl'
          asset={{
            scope: 'ewebinar',
            name: 'reasonsSection.mediaAsset',
            id: ewebinarId,
          }}
          hasYoutubeLink
          mode={mode}
          css={[tw`block w-full p-4 self-stretch`]}
        />
      </div>
    </div>
  );
};

const TestimonialsSection = ({ mode }: Props) => {
  const { watch, ...context } = useFormContext();
  const ewebinarId = context.getValues().id;
  const isActive = watch('registrationPageSettings.testimonialsSection.active');
  if (isActive === false) return null;

  return (
    <div className='flex-col p-8 py-10 items-center'>
      <div className='container mx-auto flex flex-col items-center w-full'>
        <Form.Field.Input
          name={`registrationPageSettings.testimonialsSection.headerOne`}
          mode={mode}
          data-text='What people are saying about us'
          component={PageBuilder.TextEdit}
          className='inline-block w-2/3 text-center text-2xl leading-tight outline-none mb-6'
        />
        <div className='flex justify-between items-center w-full'>
          {[0, 1, 2].map((i, index: number) => (
            <div key={index} className='relative w-1/3 p-6 m-2 rounded border border-gray-300'>
              <Form.Field.Input
                name={`registrationPageSettings.testimonialsSection.testimonials.${i}.avatarMediaUrl`}
                asset={{
                  scope: 'ewebinar',
                  name: `testimonialsSection.testimonials.${i}.avatar`,
                  id: ewebinarId,
                }}
                mode={mode}
                component={PageBuilder.Avatar}
                className='mb-2'
              />
              <Form.Field.Input
                name={`registrationPageSettings.testimonialsSection.testimonials.${i}.name`}
                data-text='Enter a name'
                mode={mode}
                component={PageBuilder.TextEdit}
                className='ml-auto whitespace-no-wrap font-medium text-lg outline-none mb-2'
              />
              <Form.Field.Input
                name={`registrationPageSettings.testimonialsSection.testimonials.${i}.description`}
                data-text='Enter their testimonial here'
                mode={mode}
                component={PageBuilder.TextEdit}
                className='ml-auto h-32 whitespace-no-wrap text-lg outline-none '
              />
              <Form.Field.Input
                name={`registrationPageSettings.testimonialsSection.testimonials.${i}.position`}
                data-text='Job title / company'
                mode={mode}
                component={PageBuilder.TextEdit}
                className='ml-auto text-gray-2 whitespace-no-wrap text-md outline-none mb-2'
              />
            </div>
          ))}
        </div>
      </div>

      <div className='container mx-auto flex flex-col items-center w-full mt-16'>
        <Form.Field.Input
          name={`registrationPageSettings.testimonialsSection.headerTwo`}
          data-text='Meet some of our customers'
          mode={mode}
          component={PageBuilder.TextEdit}
          className='inline-block  text-center text-4xl leading-tight outline-none mb-6'
        />
        <div className='flex flex-wrap justify-between items-center w-full'>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className='w-1/3 p-5 rounded  border-gray-300'>
              <PageBuilder.Image
                name={`registrationPageSettings.testimonialsSection.logos.${i}.logoMediaUrl`}
                asset={{
                  scope: 'ewebinar',
                  name: `testimonialsSection.logos.${i}`,
                  id: ewebinarId,
                }}
                mode={mode}
                className='p-4'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactSection = ({ mode, ewebinar }: Props) => {
  const { watch } = useFormContext();

  const isActive = watch('registrationPageSettings.contactsSection.active');
  if (isActive === false) return null;

  return (
    <div className='flex p-8 py-20 items-center bg-blue-2'>
      <div className='container mx-auto w-full'>
        <div className='w-1/2 mx-auto flex flex-col items-center justify-center '>
          <Form.Field.Input
            name={`registrationPageSettings.contactSection.title`}
            data-text='Interested in Learning More?'
            mode={mode}
            component={PageBuilder.TextEdit}
            className='inline-block  text-center text-3xl leading-tight outline-none mb-6'
          />
          <Form.Field.Input
            name={`registrationPageSettings.contactSection.subtitle`}
            data-text='This subtitle accompanies your final call to action button...'
            mode={mode}
            component={PageBuilder.TextEdit}
            className='inline-block text-center text-lg outline-none mb-6'
          />
          <RegisterNow
            skipAttendeeCreate
            onClick={() => onRegisterClick(mode, ewebinar)}
            setId={ewebinar.set.id}
            mode={mode}
            className='w-10/12 bg-white whitespace-no-wrap outline-none shadow text-blue-2 whitespace-no-wrap'
            name='registrationPageSettings.contactSection.ctaBtnText'
          />
        </div>
      </div>
    </div>
  );
};

const FooterSection = ({ mode }: Props) => {
  const formState = useFormContext();
  const values = formState.getValues();

  return (
    <div className='container mx-auto flex p-4 py-16 flex-col items-start bg-gray-7'>
      <PageBuilder.Image
        className='mb-8'
        name='logoMediaUrl'
        asset={{
          scope: 'ewebinar',
          name: 'logo',
          id: values.id,
        }}
        imgProps={{
          style: { padding: '0', maxHeight: '4em', maxWidth: '20vw' },
        }}
        placeholder={
          <div className='text-coral-1 text-center flex items-center justify-center cursor-pointer'>
            <ImageUploadIcon className='flex w-8 h-8' />
            <span className='max-w-48 p-2 underline'>Add a logo here</span>
          </div>
        }
        mode={mode}
      />
      <div className='container w-full flex justify-between'>
        <div className='flex flex-col w-2/3'>
          <Form.Field.Input
            name='registrationPageSettings.footerSection.tagline'
            mode={mode}
            data-text='Add a tagline here'
            component={PageBuilder.TextEdit}
            className='text-lg leading-none'
            css={{ color: '#0E282D' }}
          />
          <Form.Field.Input
            name='registrationPageSettings.footerSection.disclaimer'
            mode={mode}
            data-text='Add a disclaimer here'
            component={PageBuilder.TextEdit}
            className='mt-4 text-sm leading-relaxed'
            css={{ color: '#77989E' }}
          />
        </div>
        <div className='flex flex-col self-center items-start justify-center w-1/5'>
          <div className='text-sm leading-none' css={{ color: '#77989E' }}>
            Powered by...
          </div>
          <Logo className='h-5' />
        </div>
      </div>
    </div>
  );
};

const RegistrationPageEditor: React.FC<PageBuilderProps> = ({ ewebinar, ...props }) => {
  const [updateEwebinar] = useUpdateEwebinarMutation();

  const [mode, setMode] = useState(props.mode);
  return (
    <div className={`pb-8 min-h-screen`}>
      {mode === 'public' && (
        <SEO
          title={ewebinar.title}
          description={ewebinar?.registrationPageSettings?.headerSection?.subtitle ?? ''}
          image={ewebinar?.registrationPageSettings?.headerSection?.mainMediaUrl ?? ''}
        />
      )}

      <ApolloForm
        onSubmit={async (data) => {
          if (mode === 'edit') {
            await updateEwebinar({ variables: { data } });
          }
        }}
        defaultValues={ewebinar}
      >
        {mode === 'edit' && <Form.SubmitButton containerId='navbutton' />}

        <Form.Field name='primaryColor' component='input' type='hidden' />

        {mode !== 'public' && !props.hidePreview && (
          <div className={'container pb-3 mx-auto flex justify-between bg-blue-1'}>
            <ThemesNavBar />
            <div className={'container mx-auto flex justify-between'}>
              <div />

              <Input.toggle
                leftLabel='Edit'
                rightLabel='Preview'
                value={mode === 'preview'}
                onChange={(right: boolean) => {
                  setMode(right ? 'preview' : 'edit');
                }}
              />
            </div>
          </div>
        )}
        <div className='bg-white shadow-lg'>
          <HeaderSection mode={mode} ewebinar={ewebinar} />

          {config.ENABLE_PAGE_SECTIONS && ( // TODO: For v1.1
            <div
              className={`${mode === 'edit' ? 'bg-blue-1' : ''}`}
              css={tw`rounded shadow-lg mx-auto`}
            >
              <DescriptionSection mode={mode} ewebinar={ewebinar} />
              <PresentersSection mode={mode} ewebinar={ewebinar} />
              <ReasonsSection mode={mode} ewebinar={ewebinar} />
              <TestimonialsSection mode={mode} ewebinar={ewebinar} />
              <ContactSection mode={mode} ewebinar={ewebinar} />
            </div>
          )}

          <FooterSection mode={mode} ewebinar={ewebinar} />
        </div>
      </ApolloForm>
    </div>
  );
};

export default RegistrationPageEditor;
