"use client"

import { authClient } from "@/lib/auth-client";
import {Button} from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Home() {

  const {data: session} = authClient.useSession() 
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");

  const onSubmit=()=>{
    authClient.signUp.email({
      email,
      name,
      password
    }, {
      onError: (err)=>{
        window.alert(err.error.message)
      },
      onSuccess: ()=>{
        window.alert("Success");
      }
    })
  }

  const onLogin=()=>{
    authClient.signIn.email({
      email,
      password
    }, {
      onError: (res)=>{
        window.alert(res.error.message)
      },
      onSuccess: (res)=>{
        window.alert(res.response.status);
      }
    })
  }

  if(session){
    return(
      <div className="flex flex-col gap-y-4 p-4 justify-between items-center">
        <p> Logged in as {session.user.name} </p>
        <Button onClick={()=>authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }

  return (
    <div>
      <Input className="flex p-4 py-5 justify-between items-center w-50" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input className="flex p-4 py-5 justify-between items-center w-50" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input className="flex p-4 py-5 justify-between items-center w-50" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <Button onClick={onSubmit}>
        Create User
      </Button>
      <br /><br /><br /><br />
      <Input className="flex p-4 py-5 justify-between items-center w-50" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input className="flex p-4 py-5 justify-between items-center w-50" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <Button onClick={onLogin}>
        Login
      </Button>
    </div>

    
    
  );
}
