 "use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import { useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type ImperativeHandleFromDatePicker = {
  reset?: () => void;
  keep?: () => void;
};

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
  imperativeHandleRef?: React.RefObject<ImperativeHandleFromDatePicker | null>;
};

const DatePicker = ({
  id,
  name,
  defaultValue,
  imperativeHandleRef,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  );
  const [open, setOpen] = useState(false);

  // 监控 open 状态变化
  // const prevOpenRef = useRef(open);
  // useEffect(() => {
  //   if (prevOpenRef.current !== open) {
  //     if (open) {
  //       console.log("Popover 被打开了");
  //     } else {
  //       console.log("Popover 被关闭了");
  //     }
  //   }
  //   prevOpenRef.current = open; // 更新 ref
  // }, [open]);

  const [isGrayed, setIsGrayed] = useState(true);
  useImperativeHandle(imperativeHandleRef, () => ({
    // 接收父组件传递下来的 ref。这样，DatePicker 可以通过 useImperativeHandle 钩子，主动暴露一些方法给父组件调用。
    reset: () => {
      setDate(new Date())
      setIsGrayed(true); // 重置灰色状态
    }, // 也可以搞成提示词，比如 “输入日期”字样。
    // 保持状态
    keep: () => setIsGrayed(false), // 保持灰色状态
  }));

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate); // 更新日期状态
    setOpen(false); // 关闭弹出框
    setIsGrayed(false); // 取消灰色状态
  };

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>{/* 内部机制自动取反后调用回掉函数*/}
      <PopoverTrigger id={id} className="w-full" asChild>
        <Button
          variant="outline"
          className={cn("justify-start text-left font-normal", isGrayed && "text-muted-foreground")}
        >
          <LucideCalendar className="mr-2 h-4 w-4" />
          {isGrayed? <span>Pick a date</span> :formattedStringDate}
          <input type="hidden" name={name} value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };