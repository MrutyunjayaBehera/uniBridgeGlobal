import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { transformSupabaseUniversity } from '../utils/universityHelpers';

export function useSupabaseUniversities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUniversities = async () => {
      try {
        setLoading(true);
        setError(null);

          // fetch all columns for institutions so image fields (if any) are returned
          const { data, error: fetchError } = await supabase
            .from('institutions')
            .select('*, programs(degree, name)')
            .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        const transformed = (data || []).map(transformSupabaseUniversity);
        if (!cancelled) setUniversities(transformed);

          // debug log first few transformed entries so we can verify image field
          if (transformed && transformed.length > 0) {
            // eslint-disable-next-line no-console
            console.info('Supabase universities fetched (sample):', transformed.slice(0, 3));
          } else {
            // eslint-disable-next-line no-console
            console.info('Supabase: no institutions returned');
          }
      } catch (err) {
        console.error('Error fetching universities:', err);
        if (!cancelled) setError(err?.message || 'Failed to fetch universities');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUniversities();
    return () => { cancelled = true; };
  }, []);

  return { universities, loading, error };
}
