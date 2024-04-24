import Link from "next/link";

export default function Navbar() {
  let user = true;
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/">
            <span className="hover:text-gray-300">Marqstats</span>
          </Link>
        </div>
        <div className="space-x-4">
          {user ? (
            <Link href="/services">
              <span className="hover:text-gray-300">Logout</span>
            </Link>
          ) : (
            <Link href="/contact">
              <span className="hover:text-gray-300">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
