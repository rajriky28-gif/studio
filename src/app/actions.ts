
'use server';

import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '@/firebase/server'; // Assuming a server-side firestore instance is exported

const emailSchema = z.string().email({ message: "Invalid email format." });

export async function joinWaitlist(email: string) {
  try {
    const validation = emailSchema.safeParse(email);

    if (!validation.success) {
      return { success: false, error: validation.error.errors[0].message };
    }

    const validatedEmail = validation.data;

    // Check for existing email can be done with a query, but for simplicity
    // and to avoid reads, we'll rely on Firestore rules to handle uniqueness if needed.
    // This server action demonstrates adding the document. The client-side form
    // will now handle the write directly.

    // Note: The primary logic will now be on the client to allow for anonymous auth.
    // This server action can be kept for other purposes or removed if not needed.

    // The client-side component `waitlist-form.tsx` will now handle
    // signing in the user anonymously and writing to Firestore.
    // This ensures that even unauthenticated users can sign up for the waitlist
    // while being protected by Firestore's security rules.

    console.log(`Server action for ${validatedEmail} - primary logic moved to client.`);

    return { success: true };
  } catch (error) {
    console.error('Waitlist Error:', error);
    // Even with client-side logic, keep server-side error handling for any potential direct calls.
    if (error instanceof Error && error.message.includes('permission-denied')) {
        return { success: false, error: 'You do not have permission to perform this action.' };
    }
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}
