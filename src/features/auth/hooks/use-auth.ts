import { getCurrentSession } from "@/lib/auth/cookies";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useAuth = () => {
    const [ user, setUser] = useState<User | null>(null)
    const [ isFetched, setIsFetched] = useState(false)
  
    const pathname = usePathname();
  
    useEffect(() => {
      
      const fetchUser = async () => {
        const { user } = await getCurrentSession();
        setUser(user);
        setIsFetched(true);
      }
      fetchUser();
    },[pathname]) 

    return {
        user,
        isFetched
    };
};

export { useAuth };