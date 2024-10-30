"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { IPost } from "@/types";
import { updatePost, deletePost } from "@/services/post.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Content is required"),
});

interface ActionsProps {
  post: IPost;
}

const Actions = ({ post }: ActionsProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const loadingToast = toast.loading("Updating post...");
    setIsUpdating(true);
    try {
      await updatePost(post.id.toString(), values);
      toast.success("Post updated successfully", { id: loadingToast });
      setShowEditDialog(false);
      form.reset();
      router.refresh();
    } catch (err) {
      toast.error("Failed to update post", { id: loadingToast });
      console.error("Error updating post:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    const loadingToast = toast.loading("Deleting post...");
    setIsDeleting(true);
    try {
      await deletePost(post.id.toString());
      toast.success("Post deleted successfully", { id: loadingToast });
      setShowDeleteDialog(false);
      router.refresh();
    } catch (err) {
      toast.error("Failed to delete post", { id: loadingToast });
      console.error("Error deleting post:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="-mr-2">
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit post
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowEditDialog(false);
                    form.reset();
                  }}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Actions;
