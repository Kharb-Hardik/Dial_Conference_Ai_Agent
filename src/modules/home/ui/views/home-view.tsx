"use client"

import { authClient } from "@/lib/auth-client";
import {Button} from '@/components/ui/button'
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const {data: session} = authClient.useSession() 
  const router = useRouter();
  if(!session){
    return (
      <p>Nothing</p>
  )}
  
  
    return(
    <div className="flex flex-col gap-y-4 p-4 justify-between items-center">
      <p> Logged in as {session.user.name} </p>
      <Button onClick={ () => authClient.signOut({
          fetchOptions: {
            onSuccess: () => window.location.replace("/sign-in")
          }
        }) 
      }> 
        Sign Out 
      </Button>
    </div> 
  )
}
