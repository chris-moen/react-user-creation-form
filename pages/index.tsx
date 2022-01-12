import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Users</title>
        <meta name="description" content="Create a user" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        HELLO WORLD
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <div>(Footer)</div>
      </footer>
    </div>
  )
}
