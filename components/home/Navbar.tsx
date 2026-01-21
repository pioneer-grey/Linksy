import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import {AnimatedThemeToggler} from "@/components/ui/animated-theme-toggler"
import { useRouter } from "next/navigation";
const Navbar = () => {
    const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];
 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router=useRouter()
  return (
    <>
    <div className="relative w-full">
      <ResizableNavbar className="top-4">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <NavbarButton variant="secondary" ><AnimatedThemeToggler varient="ghost"/></NavbarButton>
            <NavbarButton variant="primary" onClick={()=>router.push("/admin/dashboard")}>Sign in {"->"}</NavbarButton>
          </div>
        </NavBody>
 
        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
 
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
               <NavbarButton variant="primary" onClick={()=>router.push("/signin")}>Sign in</NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
      </div>
    </>
  )
}

export default Navbar