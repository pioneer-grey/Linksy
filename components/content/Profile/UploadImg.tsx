"use client";

import { CircleUserRoundIcon,Upload } from "lucide-react";
import { UploadAvatar } from "@/actions/header";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { useHeader } from "@/store/useHeader"; 

export default function UploadImg() {
  const{setPicUrl}=useHeader()
  const {mutateAsync,isPending}=UploadAvatar()
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;
  const file = files[0]?.file || null;
  
   const handleRemoveFile = () => {
    removeFile(files[0]?.id);
  };

const submit = async () => {
  if (!file || !(file instanceof File)) {
    toast.error("Invalid file selected");
    return;
  }

  try {
    const res = mutateAsync(file);
  
    toast.promise(res, {
      loading: "Uploading image...",
      success: "Image uploaded successfully",
      error: (err) => err.message || "Upload failed",
    });

    const result = await res;

    setPicUrl(result.picURL);
    handleRemoveFile();

  } catch (err) {
    console.error("Upload failed:", err);
  }
};
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="inline-flex items-center gap-2 align-top">
        <div
          aria-label={previewUrl ? "Upload preview" : "Default user avatar"}
          className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-input"
        >
          {previewUrl ? (
            <img
              alt="Upload preview"
              className="size-full object-cover"
              height={32}
              src={previewUrl}
              width={32}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="opacity-60" size={16} />
            </div>
          )}
        </div>
        <div className="relative inline-block">
          <Button
          type="button"
          disabled={isPending} aria-haspopup="dialog" onClick={openFileDialog}
          variant={fileName ? "outline" : "default"}
          >
            {fileName ? "Change image" : "Upload image"}
          </Button>
          <input
            {...getInputProps()}
            aria-label="Upload image file"
            className="sr-only"
            tabIndex={-1}
          />
        </div>
      </div>
      {fileName && (
        <>
        <div className="inline-flex gap-2 text-xs">
          <p aria-live="polite" className="truncate text-muted-foreground">
            {fileName}
          </p>{" "}
        </div>
        <Button 
        type="button"
        disabled={isPending} onClick={(e)=>{
          e.stopPropagation()
          submit()}}><Upload/> Upload</Button>
        </>
      )}
    </div>
  );
}
