"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const MyLink = ({ href, children }) => {
    const pathname = usePathname();
    return (
        <Link
            href={href}
            className={`px-3 py-2 rounded-md transition-colors ${
                pathname === href
                    ? "bg-gradient-to-r from-[#F5C34D] to-[#B85C38] text-white"
                    : "text-[#2B2420] hover:bg-[#FAF6F0]"
            }`}
        >
            {children}
        </Link>
    );
};

export default MyLink;