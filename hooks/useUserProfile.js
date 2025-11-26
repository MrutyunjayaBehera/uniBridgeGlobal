import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';

/**
 * Custom hook to fetch user profile from the profiles table
 * Falls back to user.user_metadata.role if profile fetch fails or times out
 * 
 * Usage:
 *   const { userRole, loading } = useUserProfile();
 *   if (loading) return <div>Loading...</div>;
 *   if (userRole === 'university') { ... }
 */
export function useUserProfile() {
    const { user, loading: authLoading } = useAuth();
    const [userRole, setUserRole] = useState(user?.user_metadata?.role || 'student');
    const [profileLoading, setProfileLoading] = useState(false);
    const hasAttemptedFetch = useRef(false);

    useEffect(() => {
        // If auth is still loading or no user, reset role
        if (authLoading || !user) {
            setUserRole(null);
            hasAttemptedFetch.current = false;
            return;
        }

        // Immediately set role from metadata (so it's never truly null)
        const metadataRole = user?.user_metadata?.role || 'student';
        setUserRole(metadataRole);

        // If we already fetched for this user, don't re-fetch
        if (hasAttemptedFetch.current) {
            return;
        }

        hasAttemptedFetch.current = true;
        setProfileLoading(true);

        // Fetch profile from profiles table for authoritative role
        const fetchProfile = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    console.warn('Failed to fetch profile:', error.message);
                    // Keep metadata role as fallback
                } else if (data?.role) {
                    setUserRole(data.role);
                }
            } catch (err) {
                console.warn('Error fetching profile:', err?.message || err);
                // Keep metadata role on error
            } finally {
                setProfileLoading(false);
            }
        };

        fetchProfile();
    }, [user?.id, authLoading, user?.user_metadata?.role]);

    return {
        userRole,
        loading: profileLoading,
        user,
    };
}
