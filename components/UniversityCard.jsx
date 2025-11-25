import React from 'react';
import { MapPin, BookOpen, DollarSign, Award } from 'lucide-react';

const UniversityCard = ({ university, onApply }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="relative h-48">
        <img 
          src={university.image} 
          alt={university.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-primary">
          Rank #{university.ranking}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{university.name}</h3>
        
        <div className="flex items-center text-slate-500 mb-3 text-sm">
          <MapPin size={16} className="mr-1" />
          {university.location}
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">
          {university.description}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-medium text-slate-700">
          <div className="flex items-center bg-slate-50 p-2 rounded">
            <DollarSign size={14} className="mr-1 text-green-600" />
            {university.tuition}
          </div>
          <div className="flex items-center bg-slate-50 p-2 rounded">
            <Award size={14} className="mr-1 text-orange-500" />
            {university.acceptanceRate} Acceptance
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {university.programs.slice(0, 2).map((prog) => (
            <span key={prog} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              {prog}
            </span>
          ))}
          {university.programs.length > 2 && (
             <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-full">+{university.programs.length - 2} more</span>
          )}
        </div>

        <button 
          onClick={() => onApply(university.id)}
          className="mt-auto w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <BookOpen size={16} />
          View Details & Apply
        </button>
      </div>
    </div>
  );
};

export default UniversityCard;
