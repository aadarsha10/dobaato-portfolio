import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { supabase } from "../../../SupabaseClient";
import { Button } from "../button";
import { toast } from "react-hot-toast";

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  bucketName?: string;
  folderPath?: string;
  currentImageUrl?: string;
  className?: string;
}

export function ImageUpload({
  onImageUploaded,
  bucketName = "images",
  folderPath = "uploads",
  currentImageUrl,
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentImageUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    try {
      setUploading(true);
      const file = files[0];

      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("File size exceeds 5MB limit");
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${uuid()}.${fileExt}`;
      const filePath = `${folderPath}/${fileName}`;

      // Note: Bucket existence check removed as it requires elevated permissions
      // The bucket should be created through the Supabase dashboard as per setup guide

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error details:", uploadError);

        if (
          uploadError.message.includes("permission") ||
          uploadError.message.includes("policy")
        ) {
          toast.error(
            "Permission denied. Please check your storage bucket permissions in Supabase."
          );
          console.error(
            "This is likely a permissions issue. Make sure you have set up RLS policies correctly for the storage bucket."
          );
        } else {
          toast.error(`Error uploading: ${uploadError.message}`);
        }
        return;
      }

      // Get public URL for the uploaded file
      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

      if (data && data.publicUrl) {
        setPreview(data.publicUrl);
        onImageUploaded(data.publicUrl);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to get public URL for the uploaded image");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Upload exception:", error);
      toast.error("Error uploading image: " + errorMessage);
    } finally {
      setUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
        {uploading && (
          <span className="text-sm text-gray-500">Uploading...</span>
        )}
      </div>

      {preview && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-1">Image preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="h-48 w-auto object-cover rounded border"
          />
        </div>
      )}
    </div>
  );
}
