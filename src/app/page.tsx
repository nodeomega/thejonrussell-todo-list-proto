'use client'
import Image from 'next/image'
import Link from 'next/link'
import ToDoList from './components/todo-list/todo-list'
import useSWR from 'swr'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function Home() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR('/api/staticdata', fetcher);
  
  //Handle the error state
  if (error) {
    console.log(error);
    return <div>Failed to load</div>
  };
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Link href="/about">About</Link>
      </div>
      <div className="z-10 max-w-5xl w-full items-center text-sm lg:flex">
        <ToDoList data={data} />        
      </div>
    </main>
  )
}
