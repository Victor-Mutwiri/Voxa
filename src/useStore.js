// useStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from './supabaseClient';

const useStore = create(
  persist(
    (set, get) => ({
      leads: [],
      loading: false,
      error: null,
      userId: null,

      setUserId: (id) => set({ userId: id }),

      fetchLeads: async () => {
        set({ loading: true, error: null });
        try {
          const userId = get().userId; // Get userId from store
          if (!userId) throw new Error("No user found");

          const { data, error } = await supabase
            .from("leads")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

          if (error) throw error;
          set({ leads: data });
        } catch (err) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      resetStore: () => set({ leads: [], loading: false, error: null, userId: null }),
    }),
    { name: "app-storage" }
  )
);

export default useStore;
