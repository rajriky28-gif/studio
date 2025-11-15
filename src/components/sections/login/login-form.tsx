
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginTab } from "./login-tab";
import { SignupTab } from "./signup-tab";

export function LoginForm() {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-lg md:p-12">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-cream/80">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <LoginTab />
        </TabsContent>
        <TabsContent value="signup">
            <SignupTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
