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
import { Button } from "./ui/button";
import { cloneElement, useState } from "react";

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

  const trigger = cloneElement(dialogTrigger, {
    onClick: () => setIsOpenDialog((state) => !state),
  });

  const dialog = (
    <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button type="submit" onClick={action}>
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return [trigger, dialog];
};

export { useConfirmDialog };
