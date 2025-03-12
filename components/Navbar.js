import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "./searchBar";
import { NavActions } from "./navActions";
import { MobileMenu } from "./mobileMenu";
import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

 

  return (
    <nav className="bg-opacity-70 backdrop-blur mb-9 top-0 sticky z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-xl font-bold">Bazaaro</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center max-w-2xl px-8">
            <SearchBar />
          </div>

          <NavActions user={user} />
          {user ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <div className="flex items-center gap-2">
              <Link href={`/profile/${user.id}`} passHref>
  <span className="hidden sm:inline cursor-pointer">
    {`Welcome, ${user.name || user.email}!`}
  </span>
</Link>

              
                <Button variant="outline" type="submit">
                  Sign Out
                </Button>
              
              </div>
            </form>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline">Signup</Button>
              </Link>
            </>
          )}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
