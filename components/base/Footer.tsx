import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-4 mt-16 text-sm text-gray-500 border-t">
      &copy; {new Date().getFullYear()} Prayer Connect. All rights reserved.
    </footer>
  );
}
