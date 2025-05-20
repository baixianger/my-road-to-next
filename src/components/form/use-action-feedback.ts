import { useEffect, useRef } from "react";
import { ActionState } from "./to-action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: ( onArgs : OnArgs ) => void;
  onError?: ( onArgs : OnArgs ) => void;
};

type useActionFeedbackProps = {
  actionState: ActionState;
  options: UseActionFeedbackOptions;
};

/*
useEffect 在这里有个副作用就是依赖的参数里有一个变化就会导致useEffect的回调函数被调用。
此处当提交表单后，上次的actionState还没更新，但是option的引用发生了更新。
这样就会导致option触发useEffect的回调函数，打印上次的actionState的message值。
当表单提交成功后，actionState才会被刷新，此时再次会触发useEffect的回调函数，打印最新的message。
言简意赅：有两个依赖项，option先触发一次，actionState后触发一次。
方法之一：使用 useMemo 稳定 option
const options = useMemo(() => ({
  onSuccess: ({ actionState }) => console.log(actionState.message),
  onError: ({ actionState }) => console.log(actionState.message),
}), []);
方法之二：移除option依赖
方法之三：使用 useRef 来存储上次的actionState，对比时间戳。
*/

const useActionFeedback = ({ actionState, options }: useActionFeedbackProps) => {

  const prevTimestamp = useRef(actionState.timestamp); // 初始化ref,跨渲染周期保存值
  const isUpdate = actionState.timestamp !== prevTimestamp.current;

  useEffect(() => {
    if (!isUpdate) return;
    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({actionState});
    }
    if (actionState.status === "ERROR") {
      options.onError?.({actionState});
    }

    prevTimestamp.current = actionState.timestamp; // update the timestamp
  }, [isUpdate, actionState, options]); // when ever actionState changes, the effect will be called
}

export { useActionFeedback };
