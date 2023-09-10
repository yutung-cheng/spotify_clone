"use client";

import { useState } from "react";
import { Database } from "@/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

// Client Components can be used to trigger the authentication process from event handlers.
// Visit Supabase website: https://supabase.com/docs/guides/auth/auth-helpers/nextjs#usage-with-typescript
const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const supabaseClient = createClientComponentClient<Database>();

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
