-- Make user_id columns nullable to support anonymous usage
ALTER TABLE public.ratings 
ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.downloads 
ALTER COLUMN user_id DROP NOT NULL;

-- Update RLS policies to allow anonymous access

-- Ratings policies
DROP POLICY IF EXISTS "Authenticated users can delete their own ratings" ON public.ratings;
DROP POLICY IF EXISTS "Authenticated users can insert their own ratings" ON public.ratings;
DROP POLICY IF EXISTS "Authenticated users can insert ratings" ON public.ratings;

-- Allow anonymous users to insert ratings (using session tracking)
CREATE POLICY "Anyone can insert ratings"
ON public.ratings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow anonymous users to delete ratings (note: this allows manipulation)
CREATE POLICY "Anyone can delete ratings"
ON public.ratings
FOR DELETE
TO anon, authenticated
USING (true);

-- Downloads policies
DROP POLICY IF EXISTS "Authenticated users can insert downloads" ON public.downloads;

CREATE POLICY "Anyone can insert downloads"
ON public.downloads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);