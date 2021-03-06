import React from 'react';
import Head from 'next/head'

import UserForm from '../components/UserForm';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Users</title>
        <meta name="description" content="Create a user" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-10 text-center">
        <UserForm className="md:w-3/5 max-w-md" />
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <div><em>&copy; nobody</em></div>
      </footer>
    </div>
  )
}
