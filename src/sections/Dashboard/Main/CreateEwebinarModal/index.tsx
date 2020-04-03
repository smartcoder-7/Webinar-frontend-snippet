import React from 'react';
import { Link, navigate, Router } from '@reach/router';
import { Form, Input, Modal } from '@src/components/ui';
import useEWebinar from '@src/hooks/useEWebinar';
import useVimeoUpload from '@src/hooks/useVimeoUpload';
import useLocal from '@src/apolloProvider/useLocal';
import { useCreateEwebinarMutation, useStartVideoUploadMutation } from '@src/fromBackend/schema';

// import useUser from "@src/hooks/useUser"

const CreateEwebinarModal = () => {
  const eWebinarSvc = useEWebinar();
  const vimeoUploadSvc = useVimeoUpload();
  const localSvc = useLocal();
  const [startVideoUpload] = useStartVideoUploadMutation();
  const [createEwebinar] = useCreateEwebinarMutation();

  const onSubmit = async ({ video }: { video: File | string }) => {
    // Local upload
    if (video instanceof File) {
      const file = video as File;
      const videoUploadInfoQuery = await startVideoUpload({
        variables: { fileSize: file.size, fileName: file.name },
      });

      const createEwebinarQuery = await createEwebinar({
        variables: {
          data: {
            title: video.name.split('.')[0],
          },
        },
      });

      const ewebinarId =
        createEwebinarQuery &&
        createEwebinarQuery.data &&
        createEwebinarQuery.data.createEwebinar &&
        createEwebinarQuery.data.createEwebinar.id;

      await localSvc.beginVimeoUpload({
        id: ewebinarId,
        file: video,
        startVideoUploadInfo: videoUploadInfoQuery.data!.startVideoUpload,
      });
      ewebinarId && navigate(`/portal/webinar/${ewebinarId}/schedule/set`);
    }

    // Link upload (eg. youtube)
    if (typeof video === 'string') {
      const { url, title } = (
        await vimeoUploadSvc.scrape({
          url: video,
        })
      ).data.scrapeVideoMetaFromURL;

      const createdEwebinar = await eWebinarSvc.create({
        data: {
          title,
        },
      });

      const ewebinarId =
        createdEwebinar &&
        createdEwebinar.data &&
        createdEwebinar.data.createEwebinar &&
        createdEwebinar.data.createEwebinar.id;

      await vimeoUploadSvc.uploadVideo({
        id: ewebinarId,
        data: {
          url,
        },
      });

      ewebinarId && navigate(`/portal/webinar/${ewebinarId}/schedule/set`);
    }
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={{ video: '' }}>
      <Router>
        <Modal path='/new'>
          <CreateEwebinarModal.VideoUpload default />
          <CreateEwebinarModal.VideoDetails path='details' />
        </Modal>
      </Router>
    </Form>
  );
};

CreateEwebinarModal.VideoUpload = () => {
  return (
    <React.Fragment>
      <Modal.Close onClick={() => navigate('/portal')} />
      <Modal.Title>Paste a link to your video, or upload it</Modal.Title>
      <Modal.Body>
        <Form.Field name='video' component={Input.video} placeholder='https://' />
        <Form.ErrorMessage />
        <Form.SubmitButton className='ml-auto mt-4'>
          <span className='inline-flex items-center items-end'>
            Upload and setup
            <span className='ml-4 text-lg leading-none'>{'➞'}</span>
          </span>
        </Form.SubmitButton>
      </Modal.Body>
    </React.Fragment>
  );
};

CreateEwebinarModal.VideoDetails = () => {
  const VimeoUpload = useVimeoUpload();
  const vimeoUpload = VimeoUpload.get();

  return vimeoUpload && vimeoUpload.data ? (
    <React.Fragment>
      <Modal.Close onClick={() => navigate('/portal')} />
      <Modal.Title>Title</Modal.Title>
      <Modal.Body>
        <Form.Field name='title' component={Input} placeholder='Title' className='mb-6' />

        <div className='flex justify-end items-center'>
          <Link to='../'>
            <button className='appearance-none font-bold rounded-full text-sm text-gray-2  px-3 py-2 focus:outline-none focus:shadow mr-4'>
              <span className='inline-flex items-center'>Change video</span>
            </button>
          </Link>
          <Form.SubmitButton>
            <span className='inline-flex items-center'>
              Continue to setup
              <span className='ml-8 text-lg leading-none'>{'➞'}</span>
            </span>
          </Form.SubmitButton>
        </div>
      </Modal.Body>
    </React.Fragment>
  ) : null;
};

export default CreateEwebinarModal;
