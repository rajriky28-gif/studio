
'use server';

import { z } from 'zod';

const emailSchema = z.string().email({ message: "Invalid email format." });

// In a real application, you would initialize Firebase Admin SDK here.
// For this pre-launch site, we'll simulate the database interaction.

export async function joinWaitlist(email: string) {
  try {
    const validation = emailSchema.safeParse(email);

    if (!validation.success) {
      return { success: false, error: validation.error.errors[0].message };
    }

    const validatedEmail = validation.data;

    // Simulate database write
    console.log(`Email added to waitlist: ${validatedEmail}`);
    
    // Simulate a check for an already existing email
    if (validatedEmail === 'taken@example.com') {
      return { success: false, error: 'This email is already on the waitlist.' };
    }
    
    // Simulate a network delay
    await new Promise(res => setTimeout(res, 1000));

    // In a real app, you would add the email to a Firestore collection:
    // await db.collection('waitlist').add({
    //   email: validatedEmail,
    //   timestamp: new Date(),
    // });

    return { success: true };
  } catch (error) {
    console.error('Waitlist Error:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}
