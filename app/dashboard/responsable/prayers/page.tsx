'use client'
import React, { useEffect, useState } from "react"
import { allPrayers, getMyPrayers } from "@/utils/prayer_requests";
import PrayerCard from "@/components/base/PrayerCard";
import { PrayerRequestType } from "@/types/prayer";



const PrayerDashboard = () => {
  const [prayers, setPrayers] = useState<PrayerRequestType[]>([]);
  
  useEffect(() => {
    const get = async() => {
      const {success, data} = await allPrayers();
      if(success)
        setPrayers(data);
    }
    get();
  }, [])



  return (
    <div className="p-6 w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Prayer Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {prayers.map((prayer, index) => <PrayerCard prayer={prayer} key={index}/>) }
       </div>
    </div>
  );
};

export default PrayerDashboard;

