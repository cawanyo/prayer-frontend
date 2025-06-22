'use client'
import React, { useEffect, useState } from "react"
import { getMyPrayers } from "@/utils/prayer_requests";
import PrayerCard from "@/components/base/PrayerCard";
import { PrayerRequestType } from "@/types/prayer";



const PrayerDashboard = () => {
  const [prayers, setPrayers] = useState<PrayerRequestType[]>([]);
  
  useEffect(() => {
    const get = async() => {
      const prayerList = await getMyPrayers();
      setPrayers(prayerList);
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

