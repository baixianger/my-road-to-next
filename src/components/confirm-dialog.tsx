import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cloneElement, useState } from "react";
import { LucideLoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

type ConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<void>;
  dialogTrigger: React.ReactElement<React.HTMLProps<HTMLElement>>;
};

const useConfirmDialog = ({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete the item.",
  action,
  dialogTrigger,
}: ConfirmDialogProps) => {

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const triggerElement = cloneElement(dialogTrigger, {
    onClick: () => setIsOpenDialog((state) => !state),
  });

  const handleConfirm = async () => {
    setIsPending(true);
    setIsOpenDialog(true);
    try {
      await action(); // 执行删除等异步操作
    } catch(error) {
      if (error instanceof Error && !error.message.includes('NEXT_REDIRECT')) {
        toast.error("Delete failed!");
      } else {
        toast.error("Redirect to Tickets page.");
      }
      setIsPending(false);
      setIsOpenDialog(false); // 操作完成后关闭弹窗
    } finally {
      setIsPending(false);
      setIsOpenDialog(false); // 操作完成后关闭弹窗
    }
  };

  const dialog = (
    <AlertDialog open={isOpenDialog || isPending} onOpenChange={setIsOpenDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button type="submit" disabled={isPending} onClick={handleConfirm}>
              {isPending && <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return [triggerElement, dialog];
};

export { useConfirmDialog };
