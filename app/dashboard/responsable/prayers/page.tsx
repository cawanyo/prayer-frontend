'use client'
import React, { useEffect, useState } from "react"
import { allPrayers, getMyPrayers } from "@/utils/prayer_requests";
import PrayerCard from "@/components/base/PrayerCard";
import { PrayerRequestType } from "@/types/prayer";
import LoadingOverlay from "@/components/base/LoadingOverlay";



const PrayerDashboard = () => {
  const [prayers, setPrayers] = useState<PrayerRequestType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const get = async() => {
      const {success, data} = await allPrayers();
      if(success)
        setPrayers(data);

      setLoading(false);
    }
    get();
  }, [])



  return (
    <div className="p-6 w-full mx-auto">
      {
        loading
        &&
        <LoadingOverlay />
      }
      <h2 className="text-2xl font-bold mb-4">Prayer Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {prayers.map((prayer, index) => <PrayerCard prayer={prayer} key={index}/>) }
       </div>
    </div>
  );
};

export default PrayerDashboard;

