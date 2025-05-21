"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { getCookieByKey, deleteCookieByKey } from "@/action/cookies";

export const RedirectToast = () => {
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
  }, []);

  return null;
};
