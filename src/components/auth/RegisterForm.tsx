import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Turnstile } from '@marsidev/react-turnstile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import type { RegisterFormData } from '../../lib/validation/auth';

/**
 * Registration form component props
 */
export interface RegisterFormProps {
  onSuccess?: (data: { user: any; session: any }) => void;
  onError?: (error: string) => void;
  redirectTo?: string;
}

/**
 * Registration form component with email, password, and terms acceptance
 * Implements WCAG 2.1 AA accessibility standards
 */
export function RegisterForm({ onSuccess, onError, redirectTo = '/invest' }: RegisterFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({});
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(null);
  const [turnstileError, setTurnstileError] = React.useState<string | null>(null);
  const turnstileRef = React.useRef<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  /**
   * Handle form submission
   */
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    setFieldErrors({});

    try {
      const response = await fetch('/api/auth/register', {
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
        throw new Error(result.error || 'Registration failed');
      }

      // Show success message
      setSuccess(result.message || 'Registration successful! Please check your email.');

      // Call success callback
      if (onSuccess) {
        onSuccess({ user: result.user, session: result.session });
      }

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 2000);
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
      {/* Full name field (optional) */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-foreground">
          Full Name <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="fullName"
          type="text"
          autoComplete="name"
          aria-describedby={errors.fullName || fieldErrors.fullName ? 'fullName-error' : undefined}
          disabled={isLoading}
          {...register('fullName', {
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
            maxLength: {
              value: 100,
              message: 'Name must be less than 100 characters',
            },
          })}
          className={errors.fullName || fieldErrors.fullName ? 'border-destructive' : ''}
        />
        {(errors.fullName || fieldErrors.fullName) && (
          <p id="fullName-error" className="text-sm text-destructive" role="alert">
            {errors.fullName?.message || fieldErrors.fullName?.[0]}
          </p>
        )}
      </div>

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
          autoComplete="new-password"
          aria-required="true"
          aria-invalid={!!errors.password || !!fieldErrors.password}
          aria-describedby="password-requirements password-error"
          disabled={isLoading}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 'Password must contain uppercase, lowercase, number, and special character',
            },
          })}
          className={errors.password || fieldErrors.password ? 'border-destructive' : ''}
        />
        <p id="password-requirements" className="text-xs text-muted-foreground">
          Must be at least 8 characters with uppercase, lowercase, number, and special character
        </p>
        {(errors.password || fieldErrors.password) && (
          <p id="password-error" className="text-sm text-destructive" role="alert">
            {errors.password?.message || fieldErrors.password?.[0]}
          </p>
        )}
      </div>

      {/* Confirm password field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-foreground">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-required="true"
          aria-invalid={!!errors.confirmPassword || !!fieldErrors.confirmPassword}
          aria-describedby={errors.confirmPassword || fieldErrors.confirmPassword ? 'confirmPassword-error' : undefined}
          disabled={isLoading}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || "Passwords don't match",
          })}
          className={errors.confirmPassword || fieldErrors.confirmPassword ? 'border-destructive' : ''}
        />
        {(errors.confirmPassword || fieldErrors.confirmPassword) && (
          <p id="confirmPassword-error" className="text-sm text-destructive" role="alert">
            {errors.confirmPassword?.message || fieldErrors.confirmPassword?.[0]}
          </p>
        )}
      </div>

      {/* Terms acceptance checkbox */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="acceptTerms"
          aria-required="true"
          aria-invalid={!!errors.acceptTerms || !!fieldErrors.acceptTerms}
          {...register('acceptTerms', {
            required: 'You must accept the terms and conditions',
          })}
          disabled={isLoading}
          className="mt-1"
        />
        <div className="flex-1">
          <Label
            htmlFor="acceptTerms"
            className="text-sm font-normal text-muted-foreground cursor-pointer"
          >
            I agree to the{' '}
            <a
              href="/legal/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
            >
              Privacy Policy
            </a>
          </Label>
          {(errors.acceptTerms || fieldErrors.acceptTerms) && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.acceptTerms?.message || fieldErrors.acceptTerms?.[0]}
            </p>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <Alert variant="destructive" role="alert">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success message */}
      {success && (
        <Alert className="bg-green-50 border-green-200" role="status">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>

      {/* Sign in link */}
      <div className="text-center">
        <span className="text-sm text-muted-foreground">Already have an account? </span>
        <a
          href="/auth/login"
          className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
        >
          Sign in
        </a>
      </div>
    </form>
  );
}
