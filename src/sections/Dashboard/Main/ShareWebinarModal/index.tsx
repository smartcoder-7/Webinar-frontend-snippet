import React from 'react';
import { css } from '@emotion/core';
import { Modal, Text, Input, Form as FormUI } from '@src/components/ui';
import ApolloForm from '@src/components/ApolloForm';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Form, Radio } from 'semantic-ui-react';
import config from '@src/config';
import {
  User,
  useUpdateEwebinarMutation,
  EWebinarDescriptionFragment,
} from '@src/fromBackend/schema';
import { Data } from '@src/hooks/useApolloEntity';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

interface Props {
  showModal: boolean;
  showShareModal: Function;
  ewebinar?: EWebinarDescriptionFragment;
  user: Data<User>;
  onSubmit?: (e?: any) => any;
}

const ShareWebinarModal: React.FC<Props> = ({ showModal, showShareModal, ewebinar, user }) => {
  const [updateEWebinar] = useUpdateEwebinarMutation();
  const [copied, setCopied] = React.useState(false);
  const [replay, setReplay] = React.useState(false);
  const subDomain = user?.data?.team?.subdomain;

  const teamURLPrefix = subDomain
    ? `https://${subDomain}.${config.DOMAIN}`
    : `https://app.${config.DOMAIN}`;

  const teamShareUrl = subDomain ? teamURLPrefix : `${teamURLPrefix}/company/${user.data.team.id}`;

  const ewebinarShareUrl =
    ewebinar && `${teamURLPrefix}/webinar/${ewebinar.set.id}${replay ? `/replay` : ''}`;

  const myWebinarUrl = ewebinarShareUrl || teamShareUrl;
  const title = ewebinar
    ? ewebinar.title
    : `Here’s a link to a page that shows all of your available eWebinars`;

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 5000);
    }
  }, [copied]);

  const clearData = () => {
    showShareModal(false);
    setCopied(false);
    setReplay(false);
  };
  if (!showModal) return null;
  const enableUrl =
    ewebinar && ewebinar.scheduleSettings && ewebinar.scheduleSettings.showReplaySession;
  return (
    <Modal widthClass='w-5/12' modelClassName='rounded-lg'>
      <Modal.Body className='overflow-auto'>
        <div className='flex justify-center my-6'>
          <img className='w-12' src={require('@src/images/check.svg').default} alt='check image' />
        </div>
        <Text.headline className='w-10/12 mx-auto text-center'>{title}</Text.headline>
        {ewebinar && (
          <Form className='text-gray-2 flex justify-center mt-8'>
            <Form.Field className='mr-5'>
              <Radio
                className={`${!replay ? 'opacity-100' : 'opacity-50'} cursor-pointer`}
                label='Registration link'
                name='radioGroup'
                value='this'
                checked={!replay}
                onChange={() => setReplay(false)}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                className={`${replay ? 'opacity-100' : 'opacity-50'} cursor-pointer`}
                label='Replay link'
                name='radioGroup'
                value='that'
                checked={replay}
                onChange={() => setReplay(true)}
              />
            </Form.Field>
          </Form>
        )}
        <div
          css={css`
            min-height: 3rem;
          `}
        >
          {ewebinar && !enableUrl && replay && (
            <div className='flex bg-blue-1 rounded px-4 py-3 justify-between w-11/12 mx-auto mt-2'>
              <Text.body
                css={css`
                  line-height: 1.6rem;
                `}
              >
                Turn on Replay Session in Published eWebinar
              </Text.body>
              <ApolloForm
                className='flex items-center'
                showUnsavedChangesDialog
                defaultValues={ewebinar}
              >
                <FormUI.Field
                  className='flex'
                  name='scheduleSettings.showReplaySession'
                  component={Input.toggleOnOff}
                  leftLabel='ON'
                  rightLabel='OFF'
                  onChange={async (value: boolean) => {
                    console.log('CHANGIN');
                    if (value) {
                      await updateEWebinar({
                        variables: {
                          data: {
                            id: ewebinar!.id,
                            scheduleSettings: {
                              showReplaySession: true,
                            },
                          },
                        },
                      });
                      // TODO: Handle errors
                    }
                  }}
                />
              </ApolloForm>
            </div>
          )}
          {(enableUrl || !replay) && (
            <div className='flex bg-blue-1 rounded px-4 py-3 justify-between w-11/12 mx-auto mt-2'>
              <Text.body
                className='text-gray-2 flex-auto overflow-hidden'
                css={css`
                  text-overflow: ellipsis;
                `}
              >
                {myWebinarUrl}
              </Text.body>
              <CopyToClipboard text={myWebinarUrl} onCopy={() => setCopied(true)}>
                <button className='text-blue-3 pl-4 pr-2'>{copied ? 'Copied' : 'Copy'}</button>
              </CopyToClipboard>
            </div>
          )}
        </div>
      </Modal.Body>
      <div className='bg-blue-1 rounded-b-xl text-center pt-12 pb-10'>
        <Text.body className='text-center text-gray-2'>Share it on your social media</Text.body>
        <div className='my-5'>
          <FacebookShareButton className='mr-4' url={myWebinarUrl} openShareDialogOnClick>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton className='mr-4' url={myWebinarUrl} openShareDialogOnClick>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton url={myWebinarUrl} openShareDialogOnClick>
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
        </div>
        <button
          className='appearance-none font-bold rounded-full text-sm bg-gray-2 text-white px-24 py-2 focus:outline-none focus:shadow'
          onClick={clearData}
        >
          Done
        </button>
      </div>
    </Modal>
  );
};

export default ShareWebinarModal;
