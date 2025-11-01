-- Add user_id columns to ratings and downloads tables
ALTER TABLE public.ratings 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.downloads 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop the vulnerable DELETE policy on ratings
DROP POLICY IF EXISTS "Users can delete their own ratings" ON public.ratings;

-- Create secure RLS policies using auth.uid()
CREATE POLICY "Authenticated users can delete their own ratings"
ON public.ratings
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert their own ratings"
ON public.ratings
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Update existing insert policy to require authentication
DROP POLICY IF EXISTS "Anyone can insert ratings" ON public.ratings;

CREATE POLICY "Authenticated users can insert ratings"
ON public.ratings
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Update downloads table policies
DROP POLICY IF EXISTS "Anyone can insert downloads" ON public.downloads;

CREATE POLICY "Authenticated users can insert downloads"
ON public.downloads
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow anonymous users to view ratings (for public display)
-- Keep the existing SELECT policy as is

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON public.ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_downloads_user_id ON public.downloads(user_id);

-- Update the project_download_stats view to work with user_id
DROP VIEW IF EXISTS public.project_download_stats;

CREATE VIEW public.project_download_stats 
WITH (security_invoker = true) AS
SELECT 
  project_id,
  COUNT(DISTINCT COALESCE(user_id::text, user_session)) as unique_downloads,
  COUNT(*) as total_downloads
FROM public.downloads
GROUP BY project_id;

GRANT SELECT ON public.project_download_stats TO anon, authenticated;