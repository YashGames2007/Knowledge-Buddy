-- Fix privacy issue: Restrict downloads table visibility
-- Drop public SELECT policy that allows anyone to view all downloads
DROP POLICY IF EXISTS "Anyone can view downloads" ON public.downloads;

-- Create a view for public statistics (aggregated data only)
CREATE OR REPLACE VIEW public.project_download_stats AS
SELECT 
  project_id,
  COUNT(DISTINCT user_session) as unique_downloads,
  COUNT(*) as total_downloads
FROM public.downloads
GROUP BY project_id;

-- Grant SELECT permission on the view to anonymous and authenticated users
GRANT SELECT ON public.project_download_stats TO anon, authenticated;