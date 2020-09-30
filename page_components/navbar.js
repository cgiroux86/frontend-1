import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">

      </div>
      <div className="nav_links">
        <Link href="/"></Link>
        <Link href="/">Home</Link>
        <Link href="/">Register</Link>
        <Link href="/">Login</Link>
      </div>
    </div>
  )
}