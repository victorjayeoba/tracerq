"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutGrid,
  Search,
  Settings, 
  LogOut, 
  History,
  HelpCircle,
  Bell
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white flex flex-col border-r border-border h-full">
      {/* Logo at top */}
      <div className="p-5">
        <Link href="/dashboard" className="flex items-center">
          <img src="/tracer-logo.svg" alt="tЯacer" className="h-10" />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        {/* Main Group */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground font-medium mb-2 px-3">MAIN</p>
          <div className="space-y-1">
            <Link 
              href="/dashboard" 
              className={`flex items-center p-3 rounded-md text-sm font-medium transition-colors
                ${pathname === "/dashboard" 
                  ? "bg-accent text-white" 
                  : "text-foreground hover:bg-accent/10"}`}
            >
              <LayoutGrid className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link 
              href="/dashboard/track" 
              className={`flex items-center p-3 rounded-md text-sm font-medium transition-colors
                ${pathname === "/dashboard/track" 
                  ? "bg-accent text-white" 
                  : "text-foreground hover:bg-accent/10"}`}
            >
              <Search className="h-5 w-5 mr-3" />
              Track
            </Link>
          </div>
        </div>
        
        {/* Activity Group */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground font-medium mb-2 px-3">ACTIVITY</p>
          <div className="space-y-1">
            <Link 
              href="/dashboard/history" 
              className={`flex items-center p-3 rounded-md text-sm font-medium transition-colors
                ${pathname === "/dashboard/history" 
                  ? "bg-accent text-white" 
                  : "text-foreground hover:bg-accent/10"}`}
            >
              <History className="h-5 w-5 mr-3" />
              History
            </Link>
            <Link 
              href="/dashboard/notifications" 
              className={`flex items-center p-3 rounded-md text-sm font-medium transition-colors
                ${pathname === "/dashboard/notifications" 
                  ? "bg-accent text-white" 
                  : "text-foreground hover:bg-accent/10"}`}
            >
              <Bell className="h-5 w-5 mr-3" />
              Notifications
            </Link>
          </div>
        </div>
        
        {/* Preferences Group */}
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-2 px-3">PREFERENCES</p>
          <div className="space-y-1">
            <Link 
              href="/dashboard/settings" 
              className={`flex items-center p-3 rounded-md text-sm font-medium transition-colors
                ${pathname === "/dashboard/settings" 
                  ? "bg-accent text-white" 
                  : "text-foreground hover:bg-accent/10"}`}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Help section */}
      <div className="p-4 mt-auto">
        <Link href="/dashboard/help" className="block">
          <div className={`flex items-center p-3 rounded-md text-sm font-medium transition-colors
            ${pathname === "/dashboard/help" 
              ? "bg-accent text-white" 
              : "bg-accent/10 text-accent hover:bg-accent/20"}`}
          >
            <HelpCircle className="h-5 w-5 mr-3" />
            Help & Support
          </div>
        </Link>
      </div>

      {/* Log out */}
      <div className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sm font-normal text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>
    </aside>
  );
}
