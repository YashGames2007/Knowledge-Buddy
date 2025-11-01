import { supabase } from '@/integrations/supabase/client';

export const useDownloads = () => {
  const recordDownload = async (projectId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('You must be signed in to download projects');
      }
      
      const { error } = await supabase
        .from('downloads')
        .insert([
          {
            project_id: projectId,
            user_id: user.id,
            user_session: '', // Legacy field, now using user_id
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