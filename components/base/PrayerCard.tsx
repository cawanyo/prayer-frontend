import React, { useEffect, useState } from "react";
import { CheckCircle, Send, Clock, MessageCircle, ChevronDown, ChevronUp, XCircle, Pyramid, Check } from "lucide-react";
import { AnyARecord } from "dns";
import { getPrayerComment, updatePrayerState } from "@/utils/prayer_requests";
import CommentForm from "../prayer/CommentForm";
import { CommentType, PrayerRequestType, PrayerStateType } from "@/types/prayer";




interface PrayerCardProps {
  prayer: PrayerRequestType;
}



const stateLabels : Record<PrayerStateType, any>= {
  'pending': { label: "Pending", icon: <Clock className="w-4 h-4 mr-1" />, style: "bg-yellow-50 text-yellow-600", text_style: " bg-yellow-50 text-yellow-600 hover:bg-yellow-200" },
  'answered': { label: "Answered", icon: <Check className="w-4 h-4 mr-1" />, style: "bg-green-50 text-green-600", text_style: " bg-green-50 text-green-600 rounded hover:bg-green-200" },
  'failed': { label: "Failed", icon: <XCircle className="w-4 h-4 mr-1" />, style: "bg-red-50 text-red-600", text_style: "bg-red-50 text-red-600 rounded hover:bg-red-200" },
};

const PrayerCard: React.FC<PrayerCardProps> = ({ prayer }) => {
  const [comments, setComments] = useState<CommentType[]>([])
  const [commentId, setCommentId] = useState<number>(0)
  const [state, setState] = useState<PrayerStateType>(prayer.state)


  useEffect(() => {
    const get = async () => {
        const commentList = await getPrayerComment({'prayer_id': prayer.id})
        setComments(commentList);
    }
    get()
  }, [commentId])
  const [showComments, setShowComments] = useState(false);
  const handleAdd = () => {
  };


  const formattedDate = new Date(prayer.submission_date).toLocaleDateString();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 italic  mb-1">
            <strong>From:</strong> {prayer.submiter_name || "Anonymous"}
          </p>
          <p className="text-md text-gray-900 my-2">{prayer.content}</p>

          <p className="text-xs text-gray-400 italic ">Submitted on {formattedDate}</p>
        </div>
        <div className="flex gap-2">
          <span className={`flex items-center w-20 md:w-24 justify-center px-2 py-1 rounded text-xs font-medium ${stateLabels[state].style}`}>
            {stateLabels[state].icon} {stateLabels[state].label}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100">
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center text-sm font-semibold text-gray-700 mb-2 hover:underline"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {showComments ? "Hide" : "Show"} Comments ({comments.length})
          {showComments ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
        </button>

        {showComments && (
          <>
            <div className="space-y-2 text-sm text-gray-700 my-2">
              {comments.map((comment, i) => (
                <div key={i} className="bg-gray-50 p-2 rounded border text-xs">
                  <strong>{comment.submiter_name}:</strong> {comment.content}
                </div>
              ))}
            </div>
            <CommentForm prayer_id={prayer.id} setCommentId={setCommentId}/>
          </>
        )}


        <div className="flex gap-2 text-xs">
            {
                (Object.entries(stateLabels) as [PrayerStateType, any][]).map(([key, { label, icon, text_style }]) => (
                    <button
                        key={key}
                        className={`px-2 py-1 flex items-center text-xs font-medium ${text_style}`}
                        onClick={() => {updatePrayerState({'prayer_id': prayer.id, 'state': key }); setState(key) }}
                        >
                         {label}
                    </button>
            ))}
            </div>
           
        </div>
      </div>
    
  );
};

export default PrayerCard;
