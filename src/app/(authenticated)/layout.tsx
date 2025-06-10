"use client";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";

// 检查用户是否登录，如果未登录则重定向到登录页面。这是最基本的认证检查。但是不安全。总归多一层检查总比没有好。
// 因为恶意用户可以绕过layout的检查，直接访问tickets页面，因为tickets页面时一个服务器组件。
// 所以在页面组件中，也应该进行一次认证检查。
export default function AuthenticatedTicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  useLayoutEffect(() => {
    getAuthOrRedirect();
  }, [pathname]);

  return <>{children}</>;
}
