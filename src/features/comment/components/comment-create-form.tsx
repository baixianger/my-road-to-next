"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions/create-comment";

type CommentCreateFormProps = {
  ticketId: string;
  userId: string;
  userName: string;
};

const FormSchema = z.object({
  content: z
    .string()
    .min(10, {
      message: "Comment must be at least 10 characters.",
    })
    .max(1024, {
      message: "Comment must not be longer than 1024 characters.",
    }),
});

export const CommentCreateForm = ({
  ticketId,
  userId,
  userName,
}: CommentCreateFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await createComment(userId, ticketId, data.content);
      form.reset();
      toast.success("Comment created successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create comment");
      }
    }
  };

  return (
    <div className="flex gap-x-2">
      <div className="pt-3">
        <Avatar>
          <AvatarFallback>{userName[0].toUpperCase() ?? "U"}</AvatarFallback>
        </Avatar>
      </div>
      <div className="py-4 px-1 flex-1 flex flex-col gap-y-1 border-b">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Add a comment..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2 float-right">
              Comment
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
