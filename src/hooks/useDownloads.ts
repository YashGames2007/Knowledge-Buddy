import { supabase } from '@/integrations/supabase/client';

// Generate a simple session ID for tracking without auth
const getSessionId = () => {
  let sessionId = localStorage.getItem('user_session_id');
  if (!sessionId) {
    sessionId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('user_session_id', sessionId);
  }
  return sessionId;
};

export const useDownloads = () => {
  const recordDownload = async (projectId: string) => {
    try {
      const sessionId = getSessionId();
      
      const { error } = await supabase
        .from('downloads')
        .insert([
          {
            project_id: projectId,
            user_session: sessionId,
          }
        ]);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Failed to record download:', err);
      return false;
    }
  };

  return { recordDownload };
};