"use client";
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { accountPasswordPath, accountProfilePath } from "@/paths";
import { usePathname } from "next/navigation";

export const AccountTabs = () => {
  const pathName = usePathname();
  console.log(pathName.split("/").pop());
  return (
    <Tabs 
      defaultValue="profile"
      value={pathName.split("/").pop() as "profile" | "password"} 
    >
      <TabsList>
        <TabsTrigger value="profile" asChild>
          <Link href={accountProfilePath()}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger value="password" asChild>
          <Link href={accountPasswordPath()}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}