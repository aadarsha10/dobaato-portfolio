import { supabase } from "../SupabaseClient";

/**
 * Sets up necessary resources in Supabase, like storage buckets
 */
export async function setupSupabaseResources() {
  try {
    // Check if the images bucket exists, if not create it
    const { data: buckets, error: bucketsError } =
      await supabase.storage.listBuckets();

    if (bucketsError) {
      console.error(
        "Error checking for storage buckets:",
        bucketsError.message
      );
      return;
    }

    const imagesBucketExists = buckets.some(
      (bucket) => bucket.name === "images"
    );

    if (!imagesBucketExists) {
      console.log("Creating 'images' storage bucket...");

      try {
        // Create the images bucket with public access
        const { error: createError } = await supabase.storage.createBucket(
          "images",
          {
            public: true, // Make files publicly accessible
            fileSizeLimit: 5 * 1024 * 1024, // 5MB limit per file
          }
        );

        if (createError) {
          console.error("Error creating 'images' bucket:", createError.message);
          console.log(
            "Please create the 'images' bucket manually in the Supabase dashboard"
          );
        } else {
          console.log("'images' bucket created successfully");
        }
      } catch (err) {
        console.error("Exception when creating bucket:", err);
        console.log(
          "You may need to create the 'images' bucket manually in the Supabase dashboard"
        );
      }
    } else {
      console.log("'images' bucket already exists");
    }
  } catch (error) {
    console.error("Unexpected error during Supabase setup:", error);
  }
}

/**
 * Cleans up orphaned images in the portfolio folder that aren't associated with any portfolio items
 */
export async function cleanupOrphanedPortfolioImages() {
  try {
    // First, get all portfolio items to find the images in use
    const { data: portfolioItems, error: portfolioError } = await supabase
      .from("Portfolio")
      .select("image");

    if (portfolioError) {
      console.error("Error fetching portfolio items:", portfolioError.message);
      return;
    }

    // Extract image paths from portfolio items
    const usedImagePaths = new Set<string>();
    portfolioItems.forEach((item) => {
      if (item.image) {
        try {
          const url = new URL(item.image);
          const pathMatch = url.pathname.match(/\/images\/([^?]+)/);
          if (pathMatch && pathMatch[1]) {
            usedImagePaths.add(pathMatch[1]);
          }
        } catch (error) {
          console.warn("Failed to parse image URL:", item.image, error);
        }
      }
    });

    // Get all files in the portfolio folder
    const { data: files, error: filesError } = await supabase.storage
      .from("images")
      .list("portfolio");

    if (filesError) {
      console.error("Error listing portfolio images:", filesError.message);
      return;
    }

    // Find orphaned files
    const orphanedFiles = files
      .filter((file) => {
        const filePath = `portfolio/${file.name}`;
        return !usedImagePaths.has(filePath);
      })
      .map((file) => `portfolio/${file.name}`);

    if (orphanedFiles.length > 0) {
      console.log(`Found ${orphanedFiles.length} orphaned images to clean up`);

      // Delete orphaned files in batches of 100 (Supabase limit)
      for (let i = 0; i < orphanedFiles.length; i += 100) {
        const batch = orphanedFiles.slice(i, i + 100);
        const { error: deleteError } = await supabase.storage
          .from("images")
          .remove(batch);

        if (deleteError) {
          console.error("Error deleting orphaned images:", deleteError.message);
        } else {
          console.log(`Deleted ${batch.length} orphaned images`);
        }
      }
    } else {
      console.log("No orphaned portfolio images found");
    }
  } catch (error) {
    console.error("Unexpected error during cleanup:", error);
  }
}
