-- Fix security definer view issue by making it security invoker
DROP VIEW IF EXISTS public.project_download_stats;

-- Create view without security definer (defaults to security invoker)
CREATE VIEW public.project_download_stats 
WITH (security_invoker = true) AS
SELECT 
  project_id,
  COUNT(DISTINCT user_session) as unique_downloads,
  COUNT(*) as total_downloads
FROM public.downloads
GROUP BY project_id;

-- Grant SELECT permission on the view
GRANT SELECT ON public.project_download_stats TO anon, authenticated;