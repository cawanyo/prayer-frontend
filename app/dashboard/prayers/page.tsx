'use client';

import React, { useEffect, useState } from "react";
import { getMyPrayers } from "@/utils/prayer_requests";
import PrayerCard from "@/components/base/PrayerCard";
import { PrayerRequestType } from "@/types/prayer";
import EmptyCard from "@/components/base/EmptyCard";

import LoadingOverlay from "@/components/base/LoadingOverlay";

const PrayerDashboard = () => {
  const [prayers, setPrayers] = useState<PrayerRequestType[]>([]);
  const [filtered, setFiltered] = useState<PrayerRequestType[]>([]);
  const [ordering, setOrdering] = useState("-submission_date");
  const [loading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("all"); // all | pending | answered | failed

  const getPrayers = async (currentPage: number) => {
    setLoading(true);
    const { success, data } = await getMyPrayers({page:currentPage, ordering,
      state: state !== "all" ? state : undefined,});
    if (success) {
      setPrayers(data.results || []);
      setHasNext(!!data.next);
      setHasPrevious(!!data.previous);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPrayers(page);
  }, [page, ordering, state]);



  return (
    <div className="p-6 w-full mx-auto">
      {loading && <LoadingOverlay />}

      <h2 className="text-2xl font-bold mb-4">Prayer Dashboard</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <div>
          <label className="text-sm font-medium block mb-1">Trier par date :</label>
          <select
            className="border p-2 rounded text-sm"
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
          >
            <option value="-submission_date">📅 Plus récents</option>
            <option value="submission_date">📆 Plus anciens</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Filtrer par état :</label>
          <select
            className="border p-2 rounded text-sm"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="all">🔘 Tous</option>
            <option value="pending">⏳ En attente</option>
            <option value="answered">✅ Répondu</option>
            <option value="failed">❌ Échoué</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-4">
        {
          prayers.map((prayer, index) => (
            <PrayerCard prayer={prayer} key={index} />
          ))  
        }
        <EmptyCard href="/prayer" />
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          disabled={!hasPrevious}
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          className={`px-4 py-2 rounded ${hasPrevious ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
        >
          ◀️ Précédent
        </button>

        <span className="text-sm font-medium text-gray-600">Page {page}</span>

        <button
          disabled={!hasNext}
          onClick={() => setPage(prev => prev + 1)}
          className={`px-4 py-2 rounded ${hasNext ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
        >
          Suivant ▶️
        </button>
      </div>
    </div>
  );
};

export default PrayerDashboard;
