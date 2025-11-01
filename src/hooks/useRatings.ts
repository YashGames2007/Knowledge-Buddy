import { supabase } from '@/integrations/supabase/client';

export const useRatings = () => {
  const submitRating = async (projectId: string, rating: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('You must be signed in to rate projects');
      }
      
      // Delete existing rating first (if any) then insert new one
      await supabase
        .from('ratings')
        .delete()
        .eq('project_id', projectId)
        .eq('user_id', user.id);
      
      // Insert the new rating
      const { error } = await supabase
        .from('ratings')
        .insert([
          {
            project_id: projectId,
            user_id: user.id,
            rating: rating,
            user_session: '', // Legacy field, now using user_id
          }
        ]);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Failed to submit rating:', err);
      return false;
    }
  };

  const getUserRating = async (projectId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return 0;
      }
      
      const { data, error } = await supabase
        .from('ratings')
        .select('rating')
        .eq('project_id', projectId)
        .eq('user_id', user.id)
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