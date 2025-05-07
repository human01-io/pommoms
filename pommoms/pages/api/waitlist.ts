// pages/api/waitlist.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mailerlite API key
const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { 
    email, 
    userType, 
    solanaExperience, 
    numPoms, 
    primaryInterest, 
    otherInfo, 
    language,
    groupId 
  } = req.body;

  // Validate required fields
  if (!email || !userType || !groupId) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  try {
    // 1. Save to Supabase
    const { error: supabaseError } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          user_type: userType,
          solana_experience: solanaExperience,
          num_poms: numPoms,
          primary_interest: primaryInterest,
          other_info: otherInfo,
          signup_date: new Date().toISOString(),
          language: language || 'en',
          mailer_group_id: groupId
        }
      ]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      // Check if it's a duplicate email error
      if (supabaseError.code === '23505') { // Unique constraint violation
        return res.status(409).json({ error: 'You are already on our waitlist!' });
      }
      return res.status(500).json({ error: 'Database error' });
    }

    // 2. Add to MailerLite if API key is configured
    if (MAILERLITE_API_KEY) {
      try {
        // Extract first name from email (optional)
        const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
        const firstName = name.split(' ')[0];

        // Prepare custom fields
        const fields: Record<string, string> = {
          signup_source: 'website',
          user_type: userType
        };

        if (solanaExperience) fields.solana_experience = solanaExperience;
        if (numPoms) fields.num_poms = numPoms;
        if (primaryInterest) fields.primary_interest = primaryInterest;
        if (otherInfo) fields.other_info = otherInfo;

        // Call MailerLite API
        const mailerliteResponse = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-MailerLite-ApiKey': MAILERLITE_API_KEY
          },
          body: JSON.stringify({
            email,
            name: firstName || '',
            fields,
            groups: [groupId]  // Use the group ID from the form
          })
        });

        if (!mailerliteResponse.ok) {
          console.error('MailerLite error:', await mailerliteResponse.text());
          // Continue anyway since we saved to Supabase
        }
      } catch (mlError) {
        console.error('MailerLite API error:', mlError);
        // Continue anyway since we saved to Supabase
      }
    } else {
      console.warn('MAILERLITE_API_KEY not configured, skipping MailerLite integration');
    }

    // Return success
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}