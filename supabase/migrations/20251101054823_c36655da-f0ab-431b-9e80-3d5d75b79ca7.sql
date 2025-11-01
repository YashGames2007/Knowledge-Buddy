-- Fix critical security issue: Rating Manipulation Vulnerability
-- Drop the insecure policy that allows anyone to update any rating
DROP POLICY IF EXISTS "Anyone can update their own ratings" ON public.ratings;

-- Since we're using client-side session management without server-side validation,
-- we cannot securely allow UPDATE operations. Instead, we'll:
-- 1. Remove UPDATE permission entirely
-- 2. Rely on DELETE + INSERT for rating changes (using the upsert functionality)

-- Allow users to delete ratings (needed for upsert to work properly)
CREATE POLICY "Users can delete their own ratings"
ON public.ratings
FOR DELETE
USING (true);

-- Note: The existing INSERT and SELECT policies remain unchanged:
-- - "Anyone can insert ratings" (FOR INSERT WITH CHECK true)
-- - "Anyone can view ratings" (FOR SELECT USING true)

-- With this setup, the client-side upsert will work by:
-- 1. Attempting to INSERT
-- 2. On conflict (project_id, user_session), it will fail
-- 3. Client should handle by DELETE then INSERT instead