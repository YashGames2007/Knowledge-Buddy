import { supabase } from '@/integrations/supabase/client';

// Use the same session ID logic as downloads
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
      
      // Use upsert to handle both insert and update cases
      const { error } = await supabase
        .from('ratings')
        .upsert([
          {
            project_id: projectId,
            user_session: sessionId,
            rating: rating,
          }
        ], {
          onConflict: 'project_id,user_session'
        });

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Failed to submit rating:', err);
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