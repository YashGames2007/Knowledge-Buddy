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
      console.log('Download recorded successfully for project:', projectId);
      return true;
    } catch (err) {
      console.error('Failed to record download:', err);
      return false;
    }
  };

  return { recordDownload };
};