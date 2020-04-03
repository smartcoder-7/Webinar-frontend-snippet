import React from 'react';
import { usePublicSetQuery } from '@src/fromBackend/schema';
import Loading, { LoadingErrors } from '@src/components/Loading';
import { Router } from '@reach/router';
import RegistrationPageEditor from '@src/sections/Dashboard/Webinar/Registration/RegistrationPageEditor';
import RegistrationFormModal from '@src/sections/Dashboard/Webinar/Registration/RegistrationFormModal';
import { navigate } from 'gatsby';
import ThankYouPageEditor from '@src/sections/Dashboard/Webinar/Registration/ThankYouPageEditor';

const WithRender = ({ render }: { render: any }) => render();

const Register: React.FC<{ setId?: string }> = ({ setId }) => {
  const setQuery = usePublicSetQuery({ variables: { id: setId! } });

  if (!setQuery.data || !setQuery.data.publicSet) {
    return <Loading query={setQuery} />;
  }

  const ewebinar = setQuery.data.publicSet.publicWebinar;

  if (!ewebinar) {
    return <Loading error={LoadingErrors.WebinarNotAvailable} />;
  }

  return (
    <Router>
      <WithRender
        path='/register/form'
        render={() => {
          console.log('at form');
          return (
            <>
              <RegistrationPageEditor ewebinar={ewebinar} mode='public' />
              <RegistrationFormModal
                ewebinar={ewebinar}
                mode='public'
                onClose={() => {
                  navigate(`/webinar/${ewebinar.set.id}`);
                }}
              />
            </>
          );
        }}
      />

      <ThankYouPageEditor path='/register/thankyou/:attendeeId' ewebinar={ewebinar} mode='public' />

      <RegistrationPageEditor path='/*' ewebinar={ewebinar} mode='public' />
    </Router>
  );
};

export default Register;
