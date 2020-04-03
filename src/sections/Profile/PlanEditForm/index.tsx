import React, { FunctionComponent } from 'react';
import { Text, Input } from '@src/components/ui';
import { BillingContact } from '@src/components/BillingContact';

const PlanEditForm: FunctionComponent = () => {
  //TODO
  //Pull actual data from team object
  const last4 = '1234';
  let tier = '1';
  let billingContacts = ['hello@world.com', 'jaber@woky.com'];

  interface Tier {
    id: string;
    level: string;
    numWebinars: string;
    price: string;
  }

  let pricingTiers: Tier[] = [
    {
      id: '1',
      level: 'Level 1',
      numWebinars: '0 - 1 eWebinars',
      price: '$49',
    },
    {
      id: '2',
      level: 'Level 2',
      numWebinars: '2 - 5 eWebinars',
      price: '$99',
    },
    {
      id: '3',
      level: 'Level 3',
      numWebinars: '6 - 15 eWebinars',
      price: '$199',
    },
    {
      id: 'enterprise',
      level: 'Enterprise',
      numWebinars: '25 minimum eWebinars',
      price: '$10 / eWebinar / month',
    },
  ];

  return (
    <React.Fragment>
      <div className='flex py-4 items-center'>
        <div className='flex items-center'>
          <Text.subhead className='mr-3 font-normal tracking-wide'>
            You only pay for what you use
          </Text.subhead>
        </div>
      </div>
      <div className=' pb-0 mb-4 items-center'>
        <div className='text-gray-100'>
          <Text.body className='mr-10 text-gray-1'>
            Your subscription level automatically adjusts to your total published eWebinars.
            <br />
            Need more eWebinars? <span className='text-blue-3 text-bold'>Contact us now!</span>
          </Text.body>
        </div>
      </div>
      <div className='mb-8'>
        <table className='table-fixed w-full'>
          <tbody>
            <tr className='text-gray-1 text-left'>
              <th className='w-1/6 py-3'>Your Plan</th>
              <th className='w-1/4 py-3'>Published eWebinars</th>
              <th className='w-auto py-3'>Billed Monthly</th>
            </tr>
            {pricingTiers.map((pricingTier: Tier) => (
              <tr
                className={`text-left border-b border-gray-300 ${
                  tier == pricingTier.id ? 'text-blue-3' : 'text-black'
                }`}
              >
                <th className='font-bold py-3'>
                  {tier == pricingTier.id ? String.fromCharCode(10004) : ''} {pricingTier.level}
                </th>
                <th className='py-3 font-normal'>{pricingTier.numWebinars}</th>
                <th className='font-bold py-3'>
                  {pricingTier.price}{' '}
                  {pricingTier.id == 'enterprise' ? (
                    <div className='font-bold text-blue-3'>Contact Us</div>
                  ) : (
                    ''
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mb-8'>
        <div className='mb-4'>
          <Text.subhead className='font-semibold'>Billing & Card</Text.subhead>
        </div>
        <div className='mb-2'>
          <span className='font-semibold'>Current payment card:</span>
        </div>
        <div className='mb-4'>
          <span className='font-semibold text-gray-400 tracking-wide'>
            **** - **** - **** - {last4}
          </span>
        </div>
        <div className='flex items-center pb-10 border-b border-gray-300'>
          <button
            type='button'
            className={`appearence-none tracking-wider bg-blue-3 rounded-full font-normal text-sm text-white px-6 py-0 px-6 leading-loose focus:outline-none focus:shadow`}
            onClick={() => {
              //TODO: Pop up edit billing info modal
            }}
          >
            Update billing info
          </button>
          <button
            type='button'
            className={`appearence-none tracking-wider bg-white font-normal text-sm text-red-600 px-6 py-0 leading-loose focus:online-none `}
            onClick={() => {
              //TODO: Confirm cancel subscription
            }}
          >
            Cancel my subscription
          </button>
        </div>
      </div>
      <div className='mb-20 pb-20'>
        <div className='mb-4'>
          <Text.subhead className='font-semibold'>Billing contacts</Text.subhead>
        </div>
        <div className='flex flex-row item-start mb-4'>
          <div className='flex-1 pr-10'>
            <div className='mb-2'>
              <Text.body className='text-gray-1'>
                *Invoices will be emailed to all billing contacts
              </Text.body>
            </div>
            {billingContacts.map((email: string) => (
              <BillingContact email={email}></BillingContact>
            ))}
          </div>
          <div className='flex-1 pr-10'>
            <Text className='inline-block pb-2 font-semibold'>
              Add another contact<span className='text-blue-3'>*</span>
            </Text>
            <div className='flex'>
              <Input
                className='w-9/12'
                name='newBillingContact'
                type='email'
                placeholder='Email'
              ></Input>
              <button
                type='button'
                className={`appearence-none tracking-wider bg-blue-3 rounded-full font-normal text-sm text-white px-6 py-0 px-6 leading-loose ml-4 focus:outline-none focus:shadow`}
                onClick={() => {
                  //TODO: Add billing contact to list
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlanEditForm;
