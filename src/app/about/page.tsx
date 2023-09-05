import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Jon Russell\'s ToDo List Prototype Project',
  description: 'Just an about page for Jon Russell\'s ToDo List prototype NextJS demo project',
}

// `app/about/page.tsx` is the UI for the `/about` URL
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex bg-black">
        <Link href="/">Home</Link>
      </div>
      <div className="z-0 max-w-5xl w-full items-center justify-between lg:flex bg-slate-900 rounded-lg">
        <h1>{"About Jon Russell's Todo List Prototype Project"}</h1>
      </div>
      <div className="z-0 max-w-5xl w-full items-center justify-between lg:flex">        
        <div className="grid gap-4 grid-cols-3 justify-start">
          <div className="bg-slate-800 rounded-md p-1 opacity-90">
            {"This is simply a prototype app that I'm using to demonstrate capability in Next.JS."}            
          </div>
          <div className="bg-slate-800 rounded-md p-1 opacity-90">
            {"I have some todo list functionality in mind for some of Phoenixia Media's operations, and needed to come up with something that would be more to my liking than the typical Outlook-based task lists."}
          </div>
          <div className="bg-slate-800 rounded-md p-1 opacity-90">
            {"I do like the iOS Reminders app methods, but I don't like the way subtasks work. So I'm reinventing the wheel out of necessity."}
          </div>
          <div className="bg-slate-800 rounded-md p-1 opacity-90">
            {"I needed something dynamic, that will be flexible based on which list I'm loading at the moment."}
          </div>
          <div className="bg-slate-800 rounded-md p-1 opacity-90">
            {"This project is also using PNPM (Performant NPM), as opposed to NPM or Yarn, as I have not had the previous opportunity to use PNPM."}
          </div>
          <div className="bg-slate-800 rounded-md p-1 opacity-90">
            {"This is also my first project using Tailwind CSS."}
          </div>
          <div className="bg-slate-800 rounded-md p-1 opacity-90">
            {"This is focused more on functionality and less on looking pretty. However, I will try to \"pretty it up.\""}
          </div>
        </div>
      </div>
      <div className='-z-10 absolute inset-auto'>
        <Image src="/rattlesnake-warning.jpg" alt="Rattlesnake Warning" width={"488"} height={"640"}/>
      </div>
    </main>
  );
}