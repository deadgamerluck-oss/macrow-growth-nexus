-- Enable public uploads for resumes bucket
CREATE POLICY "Allow public uploads to resumes bucket"
ON storage.objects
FOR INSERT 
TO public
WITH CHECK ( bucket_id = 'resumes' );
