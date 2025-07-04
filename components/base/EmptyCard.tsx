'use client'
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";




interface EmptyCardProps {
  href: string;
}

const EmptyCard: React.FC<EmptyCardProps> = ({href}) => {
    const router = useRouter();
  return (
    <div 
        className="bg-white rounded-xl shadow-md p-4 border border-gray-200 space-y-4 flex items-center justify-center min-h-28 hover:cursor-pointer"
        onClick={() => router.push(href)}
    >
      <Plus />
    </div>
    
  );
};

export default EmptyCard;
