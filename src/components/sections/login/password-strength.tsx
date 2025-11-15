
'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type Strength = 'Weak' | 'Fair' | 'Good' | 'Strong' | '';

const checkPasswordStrength = (password: string): Strength => {
  if (!password) return '';
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (hasNumber) score++;
  if (hasSpecialChar) score++;
  if (hasUpperCase && hasLowerCase) score++;

  if (score <= 1) return 'Weak';
  if (score <= 2) return 'Fair';
  if (score <= 3) return 'Good';
  return 'Strong';
};

const strengthConfig = {
  'Weak': { color: 'bg-red-500', width: '25%' },
  'Fair': { color: 'bg-orange-500', width: '50%' },
  'Good': { color: 'bg-yellow-500', width: '75%' },
  'Strong': { color: 'bg-green-500', width: '100%' },
  '': { color: 'bg-transparent', width: '0%' },
};

export function PasswordStrength({ password }: { password?: string }) {
  const [strength, setStrength] = useState<Strength>('');

  useEffect(() => {
    setStrength(checkPasswordStrength(password || ''));
  }, [password]);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="relative h-1 w-full rounded-full bg-gray-200">
        <div
          className={cn(
            'h-1 rounded-full transition-all duration-300',
            strengthConfig[strength].color
          )}
          style={{ width: strengthConfig[strength].width }}
        ></div>
      </div>
      <p className="mt-1 text-xs text-right text-gray-500">
        {strength}
      </p>
    </div>
  );
}
