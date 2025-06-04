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
import { ActionState } from "@/components/form/to-action-state";

type ConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  dialogTrigger: React.ReactElement<React.HTMLProps<HTMLElement>>;
  onSuccess?: (actionState: ActionState) => Promise<void>;
  onError?: (actionState: ActionState) => Promise<void>;
};

const useConfirmDialog = ({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete the item.",
  action,
  dialogTrigger,
  onSuccess,
  onError,
}: ConfirmDialogProps) => {

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const triggerElement = cloneElement(dialogTrigger, {
    onClick: () => setIsOpenDialog((state) => !state),
  });

  const handleConfirm = async () => {
    setIsPending(true);
    setIsOpenDialog(true);

    const result = await action(); 

    setIsPending(false);
    setIsOpenDialog(false);
    if (result.status === "ERROR") {
      await onError?.(result);
    } else {
      await onSuccess?.(result);
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
