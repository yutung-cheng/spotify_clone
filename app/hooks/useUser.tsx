import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "@supabase/auth-helpers-nextjs";
import { Subscription, UserDetails } from "@/types";
import {
  useSessionContext,
  useUser as useSupaUser, // This will be our custom hook.
} from "@supabase/auth-helpers-react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

// UseContext tutorial
// https://molly1024.medium.com/react-hooks-usecontext%E5%88%B0%E5%BA%95%E6%80%8E%E9%BA%BC%E7%94%A8-%E7%9C%8B%E5%AE%8C%E7%AF%87%E7%B5%95%E5%B0%8D%E6%87%82-125fae4a1e86
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(
    null
  );
  const [subscription, setSubscription] =
    useState<Subscription | null>(null);

  // Two actions which we gonna use Supabase to actually fetch from our database.

  // Get our user's detail.
  const getUserDetails = () =>
    supabase.from("users").select("*").single();

  // Get our subscription detail.
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trailing", "active"])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (result) => {
          const userDetailPromise = result[0];
          const subscriptionPromise = result[1];

          if (userDetailPromise.status === "fulfilled") {
            setUserDetails(
              userDetailPromise.value.data as UserDetails
            );
          }
          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(
              subscriptionPromise.value.data as Subscription
            );
          }

          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingData || isLoadingUser,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  // Throw error if trying to use this Hooks outside of our context.
  if (context === undefined) {
    throw new Error(
      "useUser must be used within a MyUserContextProvider"
    );
  }

  return context;
};
