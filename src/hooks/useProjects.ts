import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'project' | 'notes' | 'misc' | 'presentation' | 'reference-material';
  tags: string[];
  suggested_price: number;
  drive_file_id: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

interface ProjectWithStats extends Project {
  downloadCount: number;
  rating: number;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      console.log('Fetching projects data...');
      
      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      // Fetch unique download counts from the view
      const { data: downloadStatsData, error: downloadStatsError } = await supabase
        .from('project_download_stats')
        .select('project_id, unique_downloads');

      if (downloadStatsError) throw downloadStatsError;

      // Fetch ratings for each project
      const { data: ratingsData, error: ratingsError } = await supabase
        .from('ratings')
        .select('project_id, rating');

      if (ratingsError) throw ratingsError;

      // Calculate stats for each project
      const projectsWithStats: ProjectWithStats[] = projectsData.map(project => {
        const downloadStats = downloadStatsData?.find(d => d.project_id === project.id);
        const downloadCount = downloadStats?.unique_downloads || 0;
        const projectRatings = ratingsData.filter(r => r.project_id === project.id);
        const rating = projectRatings.length > 0 
          ? projectRatings.reduce((sum, r) => sum + r.rating, 0) / projectRatings.length 
          : 0;

        return {
          ...project,
          category: project.category as Project['category'], // Type assertion for category
          downloadCount,
          rating: Math.round(rating * 10) / 10, // Round to 1 decimal place
        };
      });

      console.log('Projects fetched successfully:', projectsWithStats.length);
      setProjects(projectsWithStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
};