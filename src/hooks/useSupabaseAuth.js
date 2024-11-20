import { useEffect, useState } from "react";
import { useSupabase } from "./useSupabase";

export const useSupabaseAuth = () => {
  const supabase = useSupabase();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        setError(error);
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    getUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          getUserData();
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const signUp = async (email, password, firstName, lastName) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        phone: null,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            birthday: null,
            role: 'trainee',
          }
        }
      });
    setUser(data?.user ?? null);
    setError(error);
    setLoading(false);
    return { data, error };
  };

  const signIn = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setUser(data?.user ?? null);
    setError(error);
    setLoading(false);
    return { data, error };
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setUser(null);
    setError(error);
    setLoading(false);
  };

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
  };
};