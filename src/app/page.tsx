import SignIn from "@/components/sign-in";
import SignUp from "@/components/sign-up";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="min-w-full min-h-screen flex flex-col items-center bg-off-white text-smoky-black">
      <h1 className="text-6xl mt-28 font-bold">Welcome to Kanban Project Management</h1>
      <Tabs defaultValue="sign-in" className="w-[400px] mt-28">
        <TabsList className="grid w-full grid-cols-2 bg-ivory">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignIn />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUp />
        </TabsContent>
      </Tabs>
    </main>
  )
}
