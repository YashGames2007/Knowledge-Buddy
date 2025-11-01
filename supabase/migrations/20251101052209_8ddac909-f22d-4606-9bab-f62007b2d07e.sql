-- Add thumbnail_url column to projects table
ALTER TABLE public.projects 
ADD COLUMN thumbnail_url text;

-- Update existing projects with the test URL for verification
UPDATE public.projects 
SET thumbnail_url = 'https://fastly.picsum.photos/id/918/1960/1080';