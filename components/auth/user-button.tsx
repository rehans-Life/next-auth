"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LogoutButton from "./logout-button";
import useCurrentUser from "@/hooks/use-current-user";
import { User2Icon } from 'lucide-react'
import { LogOutIcon } from 'lucide-react'

export default function UserButton() {    
  const user = useCurrentUser();  

  return (
    <DropdownMenu>
        <DropdownMenuTrigger
            asChild
        >
            <Avatar className="cursor-pointer">
                {user?.image && <AvatarImage src={user?.image} />}
                <AvatarFallback className="text-white bg-sky-500">
                    <User2Icon />
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem>
                <LogoutButton>
                    <div className="flex items-center gap-2">
                        <LogOutIcon className="text-sm"/>
                        <span>Logout</span>
                    </div>
                </LogoutButton>                    
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
