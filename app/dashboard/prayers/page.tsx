'use client'
import React, { useEffect, useState } from "react"
import { getMyPrayers } from "@/utils/prayer_requests";
import PrayerCard from "@/components/base/PrayerCard";
import { PrayerRequestType } from "@/types/prayer";
import EmptyCard from "@/components/base/EmptyCard";
import LoadingOverlay from "@/components/base/LoadingOverlay";



const PrayerDashboard = () => {
  const [prayers, setPrayers] = useState<PrayerRequestType[]>([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const get = async() => {
      const {success, data} = await getMyPrayers();
      setPrayers(data);
      setLoading(false)
    }
    get();
  }, [])



  return (
    <div className="p-6 w-full mx-auto">
      {
        loading && <LoadingOverlay />
      }
      <h2 className="text-2xl font-bold mb-4">Prayer Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {prayers.map((prayer, index) => <PrayerCard prayer={prayer} key={index}/>) }
        <EmptyCard href="/prayer"/>
       </div>
    </div>
  );
};

export default PrayerDashboard;

