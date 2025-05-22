"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { getCookieByKey, deleteCookieByKey } from "@/action/cookies";
import { usePathname } from "next/navigation";

export const RedirectToast = () => {
  /** 
   * 这里会打印两次message，是因为useEffect在开发模式下会被调用两次，但是在生产模式下只会调用一次。
   * https://react.dev/reference/react/StrictMode
   * 如果不想在开发模式下打印两次，可以使用strictMode
   * 用<StrictMode>包裹你的应用程序，这样在开发模式下，useEffect只会被调用一次。
  */
  const pathname = usePathname();
  useEffect(() => {
    const checkToast = async () => {
      try {
        const toastMessage = await getCookieByKey("toast");
        console.log("toastMessage", toastMessage); 
        if (toastMessage) {
          toast.success(toastMessage);
          deleteCookieByKey("toast");
        }
      } catch (error) {
        console.error("Failed to read toast cookie:", error);
      }
    };
    
    checkToast();
  }, [pathname]);

  return null;
};
