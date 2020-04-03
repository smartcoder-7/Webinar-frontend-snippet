import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ReactComponent as ImageUploadIcon } from '@src/images/imageUpload.svg';
import { ReactComponent as LinkIcon } from '@src/images/link.svg';
import Logo from '@src/components/Logo/index';
import { Form, Input, Button } from '@src/components/ui';
import PageBuilder from '../PageBuilder';
import { PageBuilderModes, PageBuilderProps } from '@src/sections/Dashboard/Webinar/Registration';
import ApolloForm from '@src/components/ApolloForm';
import {
  useUpdateEwebinarMutation,
  useGetAttendeeLazyQuery,
  AttendeeFragment,
  EWebinarFragment,
} from '@src/fromBackend/schema';
import { navigate } from 'gatsby';
import { Link } from '@reach/router';
import moment from 'moment';
import ReactDOM from 'react-dom';
import { css } from '@emotion/core';
import AddToCalendar from 'react-add-to-calendar';
import tw from 'tailwind.macro';

interface HeaderSectionProps {
  mode: PageBuilderModes;
  sessionLink: string;
  attendee?: AttendeeFragment;
  ewebinar?: EWebinarFragment;
}

interface PresentersSectionProps {
  mode: PageBuilderModes;
  ewebinar?: EWebinarFragment;
}

interface FooterSectionProps {
  mode: PageBuilderModes;
}

interface collapseSectionProps {
  containerId: string;
}

interface ButtonSectionRemoveProps {
  name: string;
}

const CollapseSection = (props: collapseSectionProps) => {
  const itemsSection = [
    {
      text: 'Presenters',
      name: 'presentersSection',
    },
    {
      text: 'Share',
      name: 'shareSection',
    },
  ];

  const children = (
    <>
      {itemsSection.map((item: any, index: any) => (
        <div
          css={css`
            &:first-of-type {
              ${tw`pt-6`}
            }
            & {
              ${tw`py-3`}
            }
            &:last-of-type {
              ${tw`pb-6`}
            }
          `}
          key={index}
          className='flex justify-end items-center mr-6 text-sm text-gray-15'
        >
          <div
            className='flex justify-start whitespace-no-wrap'
            css={css`
              & {
                width: 8.5rem;
              }
            `}
          >
            <Form.Field
              name={`thankyouPageSettings[${item.name}].active`}
              component={Input.checkbox}
              label={
                <span className='whitespace-no-wrap pl-2 text-sm text-gray-3 opacity-50'>
                  {item.text}
                </span>
              }
            />
          </div>
        </div>
      ))}
    </>
  );
  if (props.containerId) {
    const el = document.getElementById(props.containerId);

    return el ? ReactDOM.createPortal(children, el) : null;
  } else {
    return children;
  }
};

const ButtonSectionRemove = ({ name }: ButtonSectionRemoveProps) => {
  const { setValue } = useFormContext();
  return (
    <>
      <div
        className='absolute'
        style={{
          top: '20px',
          right: '20px',
        }}
        onClick={() => {
          setValue(name, false);
        }}
      >
        <div className='appearance-no focus:outline-none p-2 flex items-center  bg-red-1 rounded text-white font-normal rouded-full'>
          <div className='cursor-pointer appearence-none w-5 h-5  flex items-center justify-center text-white text-xs'>
            ✕
          </div>
          Remove section
        </div>
      </div>
    </>
  );
};

const HeaderSection = ({ mode, sessionLink, attendee, ewebinar }: HeaderSectionProps) => {
  const ewebinarId = useFormContext().getValues({ nest: true }).id;

  const copyToClipboard = (link: string) => {
    var textField = document.createElement('textarea');
    textField.innerText = link;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  const { host, pathname, search, hash } = new URL(sessionLink);
  const showLink = host + pathname + search + hash;

  let time;
  if (attendee) {
    time = moment(attendee.startTime).format(`MMM Do [at] h:mma`);
  }

  let event = {
    title: ewebinar?.title || '',
    description: '',
    location: '',
    duration: ewebinar?.duration || '',
    startTime: moment(new Date(attendee?.startTime)).format('YYYY-MM-DD[T]hh:mm:ssZZ') || '',
    endTime:
      moment(new Date(attendee?.startTime))
        .add((ewebinar?.duration || 0) * 1000)
        .format('YYYY-MM-DD[T]hh:mm:ssZZ') || '',
  };

  return (
    <div>
      <div className='w-full flex p-4 items-center bg-gray-7'>
        <div className='container mx-auto flex justify-between items-center'>
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
              name='thankyouPageSettings.headerSection.teaserText'
              mode={mode}
              data-text='Add teaser text here?'
              component={PageBuilder.TextEdit}
            />
          </div>
        </div>
      </div>
      <div className='w-full flex p-4 items-center bg-white'>
        <div className='container mx-auto flex justify-between items-center'>
          <div className='w-6/12 pr-6'>
            <Form.Field.Input
              name='thankyouPageSettings.headerSection.title'
              mode={mode}
              component={PageBuilder.TextEdit}
              data-text='Title of your eWebinar'
              className='font-bold outline-none mb-6 text-5xl'
              css={{ color: '#323648', lineHeight: '3.75rem', fontFamily: 'CircularStd' }}
            />
            <Form.Field.Input
              name='thankyouPageSettings.headerSection.subtitle'
              mode={mode}
              data-text='Add a subtitle here?'
              component={PageBuilder.TextEdit}
              className='text-xl outline-none mb-6 pr-4 leading-normal'
              css={{ color: '#5B5E6D' }}
            />
            <div
              className='w-full flex items-center my-2 mb-5'
              css={css`
                .react-add-to-calendar {
                  -webkit-font-smoothing: antialiased;
                  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
                  position: relative;
                  display: inline-block;
                  margin-right: 1rem;
                }
                .react-add-to-calendar__wrapper {
                  zoom: 1;
                  cursor: pointer;
                }
                .react-add-to-calendar__button {
                  padding: 10px;
                  background-color: #f9f9f9;
                  border: 1px solid #aab9d4;
                  border-radius: 3px;
                  color: #000;
                }
                .react-add-to-calendar__button--light {
                  background-color: #fff;
                }
                .react-add-to-calendar__icon--right {
                  padding-left: 5px;
                }
                .react-add-to-calendar__icon--left {
                  padding-right: 5px;
                }
                .react-add-to-calendar__dropdown {
                  position: absolute;
                  top: 30px;
                  left: 1px;
                  width: 93%;
                  padding: 5px 0 5px 8px;
                  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.15);
                  border: 1px solid #a8a8a8;
                  background-color: #fff;
                  text-align: left;
                  ul {
                    list-style: none;
                    margin: 0;
                    li {
                      a {
                        color: #000;
                        text-decoration: none;
                        i {
                          padding-right: 10px;
                        }
                      }
                    }
                  }
                }
              `}
            >
              <AddToCalendar
                event={event}
                listItems={[{ google: 'Google' }, { apple: 'iCal' }]}
                buttonTemplate={{ 'calendar-plus-o': 'left' }}
                buttonLabel='Add to Calendar ▾'
              />
              <div className='text-blue-3'>Session begins {time ? time : '#time'}</div>
            </div>
            <div
              className='w-full flex item-center my-2 bg-blue-1 p-2 rounded-md
                justify-between'
            >
              <div className='flex items-center text-gray-3'>
                <LinkIcon className='mx-3' style={{ width: '14px', fill: '#0E282D' }} />
                eWebinar link:
                <a className='text-red-1 ml-2' href={sessionLink}>
                  {showLink}
                </a>
              </div>
              <button
                className='text-blue-3'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  copyToClipboard(sessionLink);
                }}
              >
                Copy
              </button>
            </div>
          </div>
          <div className={`w-6/12 ${mode == 'edit' && 'self-start'}`}>
            <PageBuilder.Image
              name='thankyouPageSettings.headerSection.mainMediaUrl'
              asset={{
                scope: 'ewebinar',
                name: 'headerSection.mainMediaUrl',
                id: ewebinarId,
              }}
              imgProps={{
                style: { minWidth: '22rem', maxWidth: '28rem' },
              }}
              hasYoutubeLink
              mode={mode}
              className='w-full p-4 justify-center items-center'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PresentersSection = ({ mode, ewebinar }: PresentersSectionProps) => {
  const presenters = ewebinar?.presenters;
  const { watch } = useFormContext();
  const isActive = watch('thankyouPageSettings[presentersSection].active');
  if (isActive === false) return null;

  return (
    <div className='flex p-8 py-10 items-center bg-blue-2 relative'>
      <ButtonSectionRemove name={'thankyouPageSettings[presentersSection].active'} />
      <div className='container mx-auto flex flex-col items-center w-full'>
        <Form.Field.Input
          name={`thankyouPageSettings.presentersSection.title`}
          data-text='Presenting...'
          mode={mode}
          component={PageBuilder.TextEdit}
          className='inline-block text-center text-white w-2/3 text-3xl leading-tight outline-none mb-10'
        />
        <div className='flex justify-center items-start w-full'>
          {presenters &&
            presenters.map((presenter: any, index: number) => (
              <div key={index} className='p-6'>
                <img
                  src={presenter.avatarMediaUrl}
                  className={'w-32 h-32 rounded-full border-white border-8 m-auto mb-4'}
                />
                <div className='relative ml-auto text-xl outline-none mb-2'>{presenter.name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const FooterSection = ({ mode }: FooterSectionProps) => {
  const formState = useFormContext();
  const values = formState.getValues({ nest: true });

  return (
    <div className='container mx-auto flex p-8 py-16 flex-col items-start bg-blue-1'>
      <PageBuilder.Image
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
      <div className='w-full flex justify-between'>
        <div className='flex flex-col w-2/3'>
          <Form.Field.Input
            name='thankyouPageSettings.footerSection.tagline'
            mode={mode}
            data-text='Add a tagline here'
            component={PageBuilder.TextEdit}
            className='text-lg outline-none mt-4 mb-6'
          />
          <Form.Field.Input
            name='thankyouPageSettings.footerSection.disclaimer'
            mode={mode}
            data-text='Add a disclaimer here'
            component={PageBuilder.TextEdit}
            className='text-gray-2 mt-4'
          />
        </div>
        <div className='flex flex-col self-center w-1/4'>
          <div className='text-xs text-gray-4'>Powered by...</div>
          {mode === 'public' ? (
            <Link to='/'>
              <Logo className='h-5 mr-auto' />
            </Link>
          ) : (
            <Logo className='h-5 mr-auto' />
          )}
        </div>
      </div>
    </div>
  );
};

const ThankYouPageEditor: React.FC<PageBuilderProps> = ({ ewebinar, attendeeId, ...props }) => {
  const [updateEwebinar] = useUpdateEwebinarMutation();
  const [mode, setMode] = useState(props.mode);
  const location = document.location.origin;
  const sessionLink = `${location}/webinar/${ewebinar.set.id}/view/${
    attendeeId ? attendeeId : '#id'
  }`;

  let [getAttendeeQuery, getAttendeeResponse] = useGetAttendeeLazyQuery();
  useEffect(() => {
    if (attendeeId) {
      getAttendeeQuery({
        variables: {
          id: attendeeId!,
        },
      });
    }
  }, []);

  const attendee = getAttendeeResponse?.data?.attendee || undefined;

  return (
    <div className={'bg-blue-1 shadow-lg'}>
      <div className='w-full bg-blue-1 pb-8 mx-auto min-h-screen'>
        <ApolloForm
          showUnsavedChangesDialog={mode === 'edit'}
          onSubmit={async (data) => {
            updateEwebinar({
              variables: {
                data,
              },
            });
          }}
          defaultValues={ewebinar}
        >
          <CollapseSection containerId={'thankyouCollapse'} />
          {mode !== 'public' && (
            <>
              <Form.SubmitButton containerId={'navbutton'} />
              <div className={'container pb-6 flex justify-end'}>
                <Input.toggle
                  leftLabel='Edit'
                  rightLabel='Preview'
                  value={mode === 'preview'}
                  onChange={(right: boolean) => {
                    setMode(right ? 'preview' : 'edit');
                  }}
                />
              </div>
            </>
          )}

          {process.env.NODE_ENV !== 'production' && mode === 'public' && (
            <div className='container py-8 mx-auto'>
              <Button.blueRounded
                className='mx-auto'
                onClick={() => navigate(`/webinar/${ewebinar.set.id}/view/${attendeeId}`)}
              >
                DEBUG: JOIN WEBINAR NOW :DEBUG
              </Button.blueRounded>
            </div>
          )}

          <HeaderSection
            mode={mode}
            sessionLink={sessionLink}
            attendee={attendee}
            ewebinar={ewebinar}
          />
          <PresentersSection mode={mode} ewebinar={ewebinar} />
          <FooterSection mode={mode} />
        </ApolloForm>
      </div>
    </div>
  );
};

export default ThankYouPageEditor;
