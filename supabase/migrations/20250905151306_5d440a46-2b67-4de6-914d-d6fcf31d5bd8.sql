-- Create projects table
CREATE TABLE public.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('project', 'notes', 'misc', 'presentation', 'reference-material')),
  tags TEXT[] NOT NULL DEFAULT '{}',
  suggested_price INTEGER NOT NULL DEFAULT 0,
  drive_file_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create downloads table
CREATE TABLE public.downloads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_session TEXT NOT NULL, -- We'll use session ID since we don't have auth yet
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ratings table
CREATE TABLE public.ratings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_session TEXT NOT NULL, -- We'll use session ID since we don't have auth yet
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_session) -- One rating per user per project
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

-- Create policies (public read access since no auth required)
CREATE POLICY "Anyone can view projects" 
ON public.projects 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view downloads" 
ON public.downloads 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view ratings" 
ON public.ratings 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert downloads" 
ON public.downloads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can insert ratings" 
ON public.ratings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update their own ratings" 
ON public.ratings 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample projects
INSERT INTO public.projects (title, description, category, tags, suggested_price, drive_file_id) VALUES
('React E-commerce Dashboard', 'Complete admin dashboard with React, TypeScript, and modern UI components. Includes authentication, charts, and data management.', 'project', ARRAY['React', 'TypeScript', 'Tailwind', 'Vite'], 149, '1Cas5WAN2fg7THUwY2_YBbOSnjOng_gNE'),
('Data Structures & Algorithms Notes', 'Comprehensive study material covering all major DSA topics with examples, complexity analysis, and practice problems.', 'notes', ARRAY['DSA', 'Programming', 'Interview Prep', 'PDF'], 99, '1fWJQJnhEPFvKq_pJ8DgJo-tKc8xQx9lm'),
('Modern Resume Templates', 'Professional resume templates for CS students and developers. Multiple formats including LaTeX and Word versions.', 'misc', ARRAY['Resume', 'LaTeX', 'Word', 'Professional'], 79, '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p'),
('Machine Learning Presentation', 'Comprehensive presentation on neural network optimization techniques. Includes detailed slides and code examples.', 'presentation', ARRAY['ML', 'Neural Networks', 'Presentation', 'Python'], 199, '1aBcDeFgHiJkLmNoPqRsTuVwXyZ123456'),
('Database Management System Reference', 'Complete DBMS reference material with SQL queries, normalization concepts, and real-world examples.', 'reference-material', ARRAY['DBMS', 'SQL', 'Database', 'Reference'], 89, '1BcDeFgHiJkLmNoPqRsTuVwXyZ789012'),
('Full-Stack MERN Application', 'Social media platform built with MongoDB, Express, React, and Node.js. Includes authentication and real-time features.', 'project', ARRAY['MERN', 'MongoDB', 'React', 'Node.js'], 299, '1cDeFgHiJkLmNoPqRsTuVwXyZ890123');