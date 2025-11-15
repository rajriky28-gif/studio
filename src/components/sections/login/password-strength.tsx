
'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
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
  'Weak': { color: 'bg-red-500', width: '25%', label: 'Weak' },
  'Fair': { color: 'bg-orange-500', width: '50%', label: 'Fair' },
  'Good': { color: 'bg-yellow-500', width: '75%', label: 'Good' },
  'Strong': { color: 'bg-green-500', width: '100%', label: 'Strong' },
  '': { color: 'bg-transparent', width: '0%', label: '' },
};

export function PasswordStrength({ password }: { password?: string }) {
  const [strength, setStrength] = useState<Strength>('');

  useEffect(() => {
    setStrength(checkPasswordStrength(password || ''));
  }, [password]);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
        <div className="flex gap-1.5 h-1">
            {Object.keys(strengthConfig).slice(0, 4).map((key, i) => {
                const level = Object.keys(strengthConfig).indexOf(strength);
                return (
                    <motion.div 
                        key={key}
                        className={cn("h-full w-1/4 rounded-full", level >= i + 1 ? strengthConfig[strength as Strength].color : 'bg-white/10')}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                    />
                );
            })}
        </div>
        <AnimatePresence mode="wait">
            {strength && (
                <motion.p 
                    key={strength}
                    className="text-xs text-right"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    style={{ color: strengthConfig[strength].color.replace('bg-', '') }}
                >
                    {strengthConfig[strength].label}
                </motion.p>
            )}
        </AnimatePresence>
    </div>
  );
}
