import React from 'react'
import OnboardingForm from './_components/onboardingform';
import { isOnboarded } from '@/actions/user';
import { redirect } from 'next/navigation';


export default async function Form  ()  {
  const { Onboarded } = await isOnboarded();

  if (Onboarded) {
    redirect("/dashboard");
  }
  return (
    <div className='py-10'>
      <OnboardingForm/>
    </div>
  );
}

