import { useState, useMemo } from 'react';
import { MOCK_UNIVERSITIES } from '../constants';
import UniversityCard from '../components/UniversityCard';
import { Search, Filter, Globe } from 'lucide-react';
import { searchByFields, getUnique } from '../utils/pageHelpers';
import { useSupabaseUniversities } from '../hooks/useSupabaseUniversities';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const { universities: supabaseUniversities, loading: supabaseLoading, error: supabaseError } = useSupabaseUniversities();

  // Combine Supabase universities with mock universities (Supabase first)
  const allUniversities = useMemo(() => {
    return [...(supabaseUniversities || []), ...MOCK_UNIVERSITIES];
  }, [supabaseUniversities]);

  // Get unique countries
  const countries = useMemo(() => {
    const allCountries = allUniversities.map(u => u.country);
    return ['All', ...getUnique(allCountries)];
  }, [allUniversities]);

  // Filter universities by search and country
  const filteredUniversities = useMemo(() => {
    let result = searchByFields(allUniversities, searchTerm, ['name', 'programs']);
    return result.filter(uni => selectedCountry === 'All' || uni.country === selectedCountry);
  }, [searchTerm, selectedCountry, allUniversities]);

  const handleApply = (id) => {
    alert(`Applying to University ID: ${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Explore Universities</h1>
        <p className="text-slate-600 mt-2">Discover global opportunities tailored to your career goals.</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search by name, program, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
           {countries.map(country => (
             <button
               key={country}
               onClick={() => setSelectedCountry(country)}
               className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                 selectedCountry === country 
                   ? 'bg-secondary text-white shadow-md' 
                   : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
               }`}
             >
               {country === 'All' ? <Globe size={14} className="inline mr-1"/> : null}
               {country}
             </button>
           ))}
        </div>
      </div>

      {/* Grid */}
      {/* show small dev debug banner for supabase fetch status */}
      {supabaseError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium">Error loading universities from DB: {supabaseError}</p>
        </div>
      )}
      {!supabaseError && !supabaseLoading && (!supabaseUniversities || supabaseUniversities.length === 0) && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700">No universities returned from the database (showing mock data).</p>
        </div>
      )}

      {filteredUniversities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((uni) => (
            <UniversityCard key={uni.id} university={uni} onApply={handleApply} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
          <Filter size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No universities found</h3>
          <p className="text-slate-500">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
