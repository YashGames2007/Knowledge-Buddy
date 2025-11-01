-- Drop the view that depends on user_id
DROP VIEW IF EXISTS project_download_stats;

-- Remove user_id columns from downloads and ratings tables
ALTER TABLE downloads DROP COLUMN IF EXISTS user_id;
ALTER TABLE ratings DROP COLUMN IF EXISTS user_id;

-- Recreate the view without user_id
CREATE VIEW project_download_stats AS
SELECT 
  project_id,
  COUNT(DISTINCT user_session) as unique_downloads,
  COUNT(*) as total_downloads
FROM downloads
GROUP BY project_id;

-- Ensure anyone can view downloads (needed for stats)
DROP POLICY IF EXISTS "Anyone can view downloads" ON downloads;
CREATE POLICY "Anyone can view downloads" 
ON downloads 
FOR SELECT 
USING (true);