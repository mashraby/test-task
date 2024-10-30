"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { createPost, createPostToFirebase } from "@/services/post.service";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface CreatePostModalProps {
  userId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "required.",
  }),
  body: z.string().min(1, {
    message: "required.",
  }),
});

const CreatePostModal = ({ userId }: CreatePostModalProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("post creating...");
    setIsLoading(true);
    try {
      const response = await createPost({ ...values, userId: userId });

      await createPostToFirebase(response);

      toast.success("Post successfully created.", { id: toastId });
      router.refresh();
      setIsOpen(false);
      setIsLoading(false);
      form.reset();
    } catch (err) {
      toast.error("Something went wrong, please try again.", { id: toastId });
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          Create Post <Plus className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter post body..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
