import Logo from '@src/components/Logo';
import { Link } from 'gatsby';
import React from 'react';
import PlanSelectInput from '@src/sections/Signup/SignupForm/PlanSelectInput';

const Sidebar: React.FC = () => (
  <div className='p-6 pt-4 pb-8 w-1/4 text-center text-sm bg-blue-1 z-10 flex flex-col md:w-1/4 md:p-12'>
    <Link to='/'>
      <Logo className='mx-auto' />
    </Link>

    <PlanSelectInput />
  </div>
);

export default Sidebar;
