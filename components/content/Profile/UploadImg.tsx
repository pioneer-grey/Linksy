"use client";
import React from "react";
import { CircleUserRoundIcon,Image} from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { UploadAvatar } from "@/actions/header";
import { useHeader } from '@/store/useHeader';
import CropImg from "./CropImg";
import { Dialog, DialogContent, DialogClose, DialogTrigger, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
export default function UploadImg() {
  const [croppedFile, setCroppedFile] = React.useState<File | null>(null);
  const { mutateAsync, isPending } = UploadAvatar()
  const { setPicUrl } = useHeader()
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


  const submit = async (file: File) => {
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
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Upload Image</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader >
            <DialogTitle>
              Upload Profile Image
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center flex-col gap-2">
            <div className=" flex gap-2">
              <Button size={"icon"}
            variant={fileName ? "outline" : "default"}
              >
                <CircleUserRoundIcon/>
              </Button>
              <Button
                type="button"
                disabled={isPending} aria-haspopup="dialog" onClick={openFileDialog}
                variant={fileName ? "outline" : "default"}
              >
                <Image />
                {fileName ? "Change image" : "Select image"}
              </Button>
              <input
                {...getInputProps()}
                aria-label="Upload image file"
                className="sr-only"
                tabIndex={-1}
              />
            </div>

            {previewUrl && (
              <div
                
                aria-label={"Upload preview"}
              >
                <CropImg
                  src={previewUrl}
                  onCropped={(cropped) => {
                    setCroppedFile(cropped);
                    submit(cropped);
                  }}
                >
                </CropImg>
              </div>
            )}

          </div>

        </DialogContent>
      </Dialog>
    </>
  );
}
