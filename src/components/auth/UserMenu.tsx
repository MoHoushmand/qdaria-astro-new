import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from './AuthProvider';

/**
 * UserMenu props
 */
export interface UserMenuProps {
  className?: string;
}

/**
 * Get user initials from email
 */
function getUserInitials(email: string): string {
  const parts = email.split('@')[0].split('.');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return email.substring(0, 2).toUpperCase();
}

/**
 * User menu component with dropdown
 * Shows user avatar and provides account actions
 */
export function UserMenu({ className }: UserMenuProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  // Don't render if not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  const initials = getUserInitials(user.email);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`relative h-10 w-10 rounded-full ${className || ''}`}
          aria-label="User menu"
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">My Account</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            {!user.emailConfirmed && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Email not verified
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/invest/dashboard" className="cursor-pointer">
            Dashboard
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/invest/portfolio" className="cursor-pointer">
            Portfolio
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/invest/account" className="cursor-pointer">
            Account Settings
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/support" className="cursor-pointer">
            Support
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          {isLoggingOut ? 'Logging out...' : 'Log out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Compact user menu button (for mobile/smaller screens)
 */
export function CompactUserMenu() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <a href="/auth/login">Sign In</a>
        </Button>
        <Button size="sm" asChild>
          <a href="/auth/register">Sign Up</a>
        </Button>
      </div>
    );
  }

  const initials = getUserInitials(user.email);

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
          {initials}
        </AvatarFallback>
      </Avatar>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  );
}
