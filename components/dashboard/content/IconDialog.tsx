import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useStyles } from "@/store/useStyles";
import { MultiSelect } from "@/components/multi-select"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { IconsList } from "@/lib/IconsList";
import { AddIcons } from "@/actions/Icons";
const FormSchema = z.object({
  icons: z
    .array(z.string())
});



const IconDialog = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const { isPending, mutateAsync } = AddIcons()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      icons: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const values = {
        icons: data.icons
      }
      const res = mutateAsync(values)
      toast.promise(res, {
        loading: "Adding icons…",
        success: "Icons added successfully.",
        error: "Failed to add icons."
      })
      await res
      setOpen(false)
    }
    catch (err) {
      console.log(err)
    }


  }

  return (
    <>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild>
          <Button variant="ghost"><Plus /></Button>
        </DialogTrigger>
        <DialogContent >
          <DialogHeader>
            <DialogTitle className="">Add Icons</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <FormField
                control={form.control}
                name="icons"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <MultiSelect

                        className="border-2 dark:border-secondary border-black/40 bg-card"
                        options={IconsList}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select Icons"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter
                className="mt-10"
              >
                <DialogClose asChild>
                  <Button variant="ghost">
                    Cancel
                  </Button>
                </DialogClose>
                <Button

                  disabled={isPending}
                  type="submit"
                >
                  Save
                </Button>
              </DialogFooter>

            </form>
          </Form>
        </DialogContent>
      </Dialog>

    </>
  )
}

export default IconDialog