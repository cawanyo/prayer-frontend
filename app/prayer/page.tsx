import React from 'react'
import PrayerForm from '@/components/prayer/PrayerForm';

export default function page() {
  return (

      <div className="w-full p-5  mx-auto md:mt-3 md:max-w-4xl ">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Submit a Prayer Request
          </h1>
          <PrayerForm />
      </div>

  )
}
