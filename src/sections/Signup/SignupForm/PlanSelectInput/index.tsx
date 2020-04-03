import React from 'react';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

const plans = [
  {
    default: true,
    name: 'Starter',
    webinars: '1',
    featureText: '1 Published eWebinar',
    featureTextShort: '1 eWebinar',
    plans: {
      year: {
        costMonth: '$20',
        per: '/mo',
      },
      month: {
        costMonth: '$25',
        per: '/mo',
      },
    },
  },
  {
    name: 'Startup',
    webinars: '5',
    featureText: 'Up to 5 eWebinars',
    featureTextShort: '5 eWebinars',
    plans: {
      year: {
        costMonth: '$40',
        per: '/mo',
      },
      month: {
        costMonth: '$45',
        per: '/mo',
      },
    },
  },
  {
    name: 'Small Biz',
    webinars: '15',
    featureText: 'Up to 15 eWebinars',
    featureTextShort: '15 eWebinars',
    plans: {
      year: {
        costMonth: '$90',
        per: '/mo',
      },
      month: {
        costMonth: '$99',
        per: '/mo',
      },
    },
  },
  {
    name: 'Enterprise',
    webinars: 'Unlimited',
    featureText: 'Over 15 eWebinars',
    featureTextShort: 'Over 15 eWebinars',
    plans: {
      year: {
        costMonth: 'Contact us',
        per: '',
      },
      month: {
        costMonth: 'Contact us',
        per: '',
      },
    },
  },
];

const Plan = styled(({ product }) => {
  return (
    <div className='w-full mt-4 px-2'>
      <div className='w-full text-center font-light border border-gray-1 text-gray-2 rounded p-4'>
        <div className='text-2xl'>{product.name}</div>
        <div className='text-lg pt-1'>{product.webinars}</div>
        <div className='text-xs'>{product.webinars === '1' ? 'eWebinar' : 'eWebinars'}</div>
        <div className='pt-1'>
          {true ? product.plans.month.costMonth : product.plans.year.costMonth}
          <span className='text-xs'>{true ? product.plans.month.per : product.plans.year.per}</span>
        </div>
      </div>
    </div>
  );
})`
  ${tw`w-1/4 pr-8 flex select-none cursor-pointer border-gray-1 rounded`}

  .featureText,.featureTextShort {
    ${tw`text-xs text-xs md:text-sm text-gray-1`}
  }

  input:checked ~ * {
    ${tw`text-black`}
  }

  .featureText {
    display: none;
    ${tw`whitespace-no-wrap`}
  }

  .featureTextShort {
    ${tw`whitespace-no-wrap`}
  }

  // @ts-ignore
  ${({ theme }) => theme.media('md')} {
    .featureText {
      display: block;
    }

    .featureTextShort {
      display: none;
    }
  }
`;

const PlanSelectInput = () => {
  return (
    <div className='mb-4'>
      <fieldset className='w-full'>
        <div className='flex flex-col -mx-2'>
          {plans.map((product, index) => (
            <Plan key={index} product={product} />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default PlanSelectInput;
