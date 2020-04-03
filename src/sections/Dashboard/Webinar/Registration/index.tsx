import useComponentSize from '@src/hooks/useComponentSize';
import SideBarCollapse from '@src/components/SideBar/Collapse';
import React, { useState, useCallback, useEffect } from 'react';
import tw from 'tailwind.macro';
import { css } from '@emotion/core';

import RegistrationFormModal from './RegistrationFormModal';
import { Router } from '@reach/router';
import RegistrationPageEditor from '@src/sections/Dashboard/Webinar/Registration/RegistrationPageEditor';
import ThankYouPageEditor from '@src/sections/Dashboard/Webinar/Registration/ThankYouPageEditor';
import { EWebinarFragment } from '@src/fromBackend/schema';

const WithRender = ({ render }: { render: any }) => render();

export type PageBuilderModes = 'preview' | 'edit' | 'public';

export interface PageBuilderProps {
  ewebinar: EWebinarFragment;
  attendeeId?: string;
  mode: PageBuilderModes;
  hidePreview?: boolean;
}

interface RegistrationProps {
  ewebinar: EWebinarFragment;
}

const Registration: React.FC<RegistrationProps> = ({ ewebinar }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const containerDimensions = useComponentSize(containerRef);
  const windowWidth = window.innerWidth;
  const sideBarWidth = (windowWidth - containerDimensions.width) / 2;

  const [showSidebar, setShowSidebar] = useState(true);
  useEffect(() => {
    windowWidth >= 1300 ? '' : setShowSidebar((value) => !value);
  }, []);
  const toggleSidebar = useCallback(() => setShowSidebar((value) => !value), []);

  return (
    <>
      <SideBarCollapse
        showSideBar={showSidebar}
        width={sideBarWidth}
        windowWidth={windowWidth}
        page='registration'
      />
      <div
        ref={containerRef}
        css={tw`rounded mx-auto`}
        className='h-full relative mx-auto min-h-128'
      >
        {windowWidth <= 1300 && (
          <button
            css={css`
              position: fixed;
              left: ${sideBarWidth - 16}px;
              top: 190px;
              padding-bottom: 0.19rem;
              padding-left: 0.1rem;
              font-weight: 600;
            `}
            className={`z-sidebar-button cursor-pointer outline-none rounded-full h-8 w-8 shadow-md ${
              !showSidebar ? 'bg-teal-2 text-white' : 'bg-white text-teal-2'
            }`}
            onClick={toggleSidebar}
          >
            {showSidebar ? '>' : '<'}
          </button>
        )}
        <Router>
          <RegistrationPageEditor path='/page' ewebinar={ewebinar} mode='edit' />

          <WithRender
            path='/form'
            render={() => {
              return (
                <>
                  <RegistrationPageEditor ewebinar={ewebinar} mode='preview' hidePreview={true} />
                  <RegistrationFormModal ewebinar={ewebinar} mode='edit' />
                </>
              );
            }}
          />

          <ThankYouPageEditor path='/thankyou' ewebinar={ewebinar} mode='edit' />
        </Router>
      </div>
    </>
  );
};

export default Registration;
