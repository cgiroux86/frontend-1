import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">

      </div>
      <div className="nav_links">
        <Link href="/login"><a>Login</a></Link>
        <Link href="/register"><a>Register</a></Link>
        <Link href="/home"><a>Home</a></Link>
      </div>
    </div>
  )
}