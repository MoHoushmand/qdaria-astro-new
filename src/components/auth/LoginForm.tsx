import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import type { LoginFormData } from '../../lib/validation/auth';

/**
 * Login form component props
 */
export interface LoginFormProps {
  onSuccess?: (data: { user: any; session: any }) => void;
  onError?: (error: string) => void;
  redirectTo?: string;
}

/**
 * Login form component with email and password
 * Implements WCAG 2.1 AA accessibility standards
 */
export function LoginForm({ onSuccess, onError, redirectTo = '/invest' }: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  /**
   * Handle form submission
   */
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details) {
          setFieldErrors(result.details);
        }
        throw new Error(result.error || 'Login failed');
      }

      // Call success callback
      if (onSuccess) {
        onSuccess({ user: result.user, session: result.session });
      }

      // Redirect to specified page
      window.location.href = redirectTo;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email || !!fieldErrors.email}
          aria-describedby={errors.email || fieldErrors.email ? 'email-error' : undefined}
          disabled={isLoading}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address',
            },
          })}
          className={errors.email || fieldErrors.email ? 'border-destructive' : ''}
        />
        {(errors.email || fieldErrors.email) && (
          <p id="email-error" className="text-sm text-destructive" role="alert">
            {errors.email?.message || fieldErrors.email?.[0]}
          </p>
        )}
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-required="true"
          aria-invalid={!!errors.password || !!fieldErrors.password}
          aria-describedby={errors.password || fieldErrors.password ? 'password-error' : undefined}
          disabled={isLoading}
          {...register('password', {
            required: 'Password is required',
          })}
          className={errors.password || fieldErrors.password ? 'border-destructive' : ''}
        />
        {(errors.password || fieldErrors.password) && (
          <p id="password-error" className="text-sm text-destructive" role="alert">
            {errors.password?.message || fieldErrors.password?.[0]}
          </p>
        )}
      </div>

      {/* Remember me checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="rememberMe"
          {...register('rememberMe')}
          disabled={isLoading}
        />
        <Label
          htmlFor="rememberMe"
          className="text-sm font-normal text-muted-foreground cursor-pointer"
        >
          Remember me for 30 days
        </Label>
      </div>

      {/* Error message */}
      {error && (
        <Alert variant="destructive" role="alert">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      {/* Forgot password link */}
      <div className="text-center">
        <a
          href="/auth/forgot-password"
          className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
        >
          Forgot your password?
        </a>
      </div>
    </form>
  );
}
