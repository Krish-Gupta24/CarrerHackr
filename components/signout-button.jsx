"use client";

import { signOut } from "next-auth/react"; 
import { Button } from "./ui/button";
import { toast } from "sonner";

export function SignOut() {
  const handleLogout = async () => {

    try {
      toast.success("Logout Successful");
      await signOut({
        callbackUrl: "/",
      });
    } catch (error) {
      toast.error(error.message)
    }
    
  };

  return (
    <Button
      variant="destructive"
      className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:hover:bg-red-600"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
