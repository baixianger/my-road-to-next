import { useActionFeedback } from "@/components/form/use-action-feedback";
import { toast } from "sonner";
import { ActionState } from "./to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

const Form = ({action, actionState, children, onSuccess, onError}: FormProps) => {

  useActionFeedback({
    actionState,
    options: {
      onSuccess: ({ actionState }) => {
        if (actionState.message) toast.success(actionState.message);//仅显示提交状态，不toast文本框错误。
        onSuccess?.(actionState);
      },
      onError: ({ actionState }) => {
        if (actionState.message) toast.error(actionState.message);
        onError?.(actionState);
      },
    },
  });
  
  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
}

export { Form };