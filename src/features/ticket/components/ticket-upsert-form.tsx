"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getTicket } from "../queries/get-ticket";
import { upsertTicket } from "../actions/upsert-ticket";
import { SubmitButton } from "@/components/form/submit-button";
import { useActionState, useRef } from "react";
import { FieldError } from "./field-error";
import { EMPTY_ACTION_STATE } from "../../../components/form/to-action-state";
import { Form } from "@/components/form/form";
import { fromCent } from "@/utils/currency";
import { DatePicker, ImperativeHandleFromDatePicker } from "@/components/date-picker";

type TicketUpsertFormProps = {
  ticket?: Awaited<ReturnType<typeof getTicket>>;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  // useActionState takes a function that returns a promise and an initial state,
  // the function will be called when the form is submitted, and the state will be updated with the result of the function
  // binding the state to the form action, the state will be updated when the form is submitted.
  // So the state can wrap a lot of information about the result of the action.
  const [actionState, action] = useActionState(
    upsertTicket, //如果有额外的参数bind到action里，要在这里传入
    EMPTY_ACTION_STATE
  );
  const datePickerImperativeHandleRef =
    useRef<ImperativeHandleFromDatePicker>(null);

  const handleSuccess = () => {
    // 如果提交成功，重置日期选择器，并将日期置为灰色状态
    datePickerImperativeHandleRef.current?.reset?.();
  };

  const handleError = () => {
    // 如果输入的信息有误，保持日期处于非灰色状态，提示用户输入错误
    datePickerImperativeHandleRef.current?.keep?.();
  };


  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess} onError={handleError}>
      <Input type="hidden" name="id" defaultValue={ticket?.id} />

      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        name="title"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <FieldError actionState={actionState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <FieldError actionState={actionState} name="content" />

      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            // key={actionState.timestamp}
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
            imperativeHandleRef={datePickerImperativeHandleRef}
          />
          <FieldError actionState={actionState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            step=".01"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket?.bounty) : "")
            }
          />
          <FieldError actionState={actionState} name="bounty" />
        </div>
      </div>

      <SubmitButton label={ticket ? "Update" : "Create"} />
    </Form>
  );
};

export { TicketUpsertForm };
