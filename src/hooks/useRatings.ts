import { supabase } from '@/integrations/supabase/client';

// Generate session ID for anonymous tracking
const getSessionId = () => {
  let sessionId = localStorage.getItem('user_session_id');
  if (!sessionId) {
    sessionId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('user_session_id', sessionId);
  }
  return sessionId;
};

export const useRatings = () => {
  const submitRating = async (projectId: string, rating: number) => {
    try {
      const sessionId = getSessionId();
      console.log('Starting rating submission - Project:', projectId, 'Rating:', rating, 'Session:', sessionId);
      
      // Delete existing rating first (if any)
      const { error: deleteError } = await supabase
        .from('ratings')
        .delete()
        .eq('project_id', projectId)
        .eq('user_session', sessionId);
      
      if (deleteError) {
        console.error('Delete error (non-critical):', deleteError);
      } else {
        console.log('Delete operation completed');
      }
      
      // Insert the new rating
      console.log('Attempting to insert rating...');
      const { data, error } = await supabase
        .from('ratings')
        .insert([
          {
            project_id: projectId,
            user_session: sessionId,
            rating: rating,
          }
        ])
        .select();

      if (error) {
        console.error('Insert error:', error);
        throw error;
      }
      
      console.log('Rating inserted successfully:', data);
      return true;
    } catch (err) {
      console.error('Failed to submit rating - Full error:', err);
      return false;
    }
  };

  const getUserRating = async (projectId: string) => {
    try {
      const sessionId = getSessionId();
      
      const { data, error } = await supabase
        .from('ratings')
        .select('rating')
        .eq('project_id', projectId)
        .eq('user_session', sessionId)
        .maybeSingle();

      if (error) throw error;
      return data?.rating || 0;
    } catch (err) {
      console.error('Failed to get user rating:', err);
      return 0;
    }
  };

  return { submitRating, getUserRating };
};