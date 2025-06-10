# Supabase Storage Setup Guide

This guide will help you set up the necessary storage bucket and permissions in Supabase for the portfolio image uploads to work correctly.

## Step 1: Create the images bucket

1. Log into your Supabase dashboard at https://app.supabase.com
2. Select your project
3. Click on "Storage" in the left sidebar
4. Click "Create Bucket"
5. Enter "images" as the bucket name
6. Check "Public bucket" to make the files publicly accessible
7. Click "Create bucket"

## Step 2: Set up the proper permissions

For the upload functionality to work, you need to configure the correct Row Level Security (RLS) policies for the storage bucket:

1. In the Supabase dashboard, go to the "Storage" section
2. Select the "images" bucket
3. Click on the "Policies" tab
4. Add the following policies:

### For authenticated users (admin users)

#### Insert/Upload Policy:

1. Click "Add Policy" and choose "Create custom policy"
2. Name: "Allow authenticated users to upload files"
3. Definition:

```sql
(auth.role() = 'authenticated')
```

4. Select "INSERT" as the policy type
5. Click "Save policy"

#### Select/View Policy:

1. Click "Add Policy" and choose "Create custom policy"
2. Name: "Allow authenticated users to view files"
3. Definition:

```sql
(auth.role() = 'authenticated')
```

4. Select "SELECT" as the policy type
5. Click "Save policy"

#### Update Policy:

1. Click "Add Policy" and choose "Create custom policy"
2. Name: "Allow authenticated users to update files"
3. Definition:

```sql
(auth.role() = 'authenticated')
```

4. Select "UPDATE" as the policy type
5. Click "Save policy"

#### Delete Policy:

1. Click "Add Policy" and choose "Create custom policy"
2. Name: "Allow authenticated users to delete files"
3. Definition:

```sql
(auth.role() = 'authenticated')
```

4. Select "DELETE" as the policy type
5. Click "Save policy"

### For public/anonymous users

#### Select/View Policy for Public Access:

1. Click "Add Policy" and choose "Create custom policy"
2. Name: "Allow public to view files"
3. Definition:

```sql
true
```

4. Select "SELECT" as the policy type
5. Click "Save policy"

## Step 3: Create folders in the bucket

For better organization, you can create folders in the bucket:

1. In the Storage section, select the "images" bucket
2. Click "Create Folder"
3. Create the following folders:
   - `portfolio` - For portfolio project images
   - `blog` - For blog post images
   - `uploads` - For general uploads

## Troubleshooting

If you encounter any of these errors:

### "Error creating 'images' bucket: new row violates row-level security policy"

This means your user doesn't have permission to create buckets. You need to create the bucket manually through the Supabase dashboard as described above.

### "Error uploading: permission denied"

This means your RLS policies are not correctly set up. Review the policies above and make sure they are properly configured.

### "Bucket doesn't exist"

Make sure you've created the "images" bucket exactly as specified (case-sensitive).

### 400 Bad Request errors

This could be due to:

- File size exceeding limits (default is 5MB)
- Incorrect bucket name
- Missing policies
- Trying to upload to a non-existent folder
