'use client'
import React, { useEffect, useState } from "react"
import { getMyPrayers } from "@/utils/prayer_requests";
import PrayerCard from "@/components/base/PrayerCard";



const PrayerDashboard = () => {
  const [prayers, setPrayers] = useState([]);
  useEffect(() => {
    const get = async() => {
      const prayerList = await getMyPrayers();
      setPrayers(prayerList);
    }
    get();
  }, [])



  return (
    <div className="p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Prayer Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {prayers.map((prayer, index) => <PrayerCard prayer={prayer} key={index}/>) }
       </div>
    </div>
  );
};

export default PrayerDashboard;

