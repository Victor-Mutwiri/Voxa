// useStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from './supabaseClient';

const useStore = create(
  persist(
    (set, get) => ({
      leads: [],
      emailBodies: [],
      emailSubjects: [],
      activeEmailSubject: null,
      activeEmailBody: null,
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
            .from("extracted_leads")
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

      fetchEmailBodies: async () => {
        set({ loading: true, error: null });
        try {
          const userId = get().userId;
          if (!userId) throw new Error("No user found");

          const { data, error } = await supabase
            .from("templates")
            .select("*")
            .eq("user_id", userId)
            .eq("type", "EmailBody")
            .order("created_at", { ascending: false });

          if (error) throw error;
          set({ emailBodies: data });
        } catch (err) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      fetchEmailSubjects: async () => {
        set({ loading: true, error: null });
        try {
          const userId = get().userId;
          if (!userId) throw new Error("No user found");

          const { data, error } = await supabase
            .from("templates")
            .select("*")
            .eq("user_id", userId)
            .eq("type", "EmailSubject")
            .order("created_at", { ascending: false });

          if (error) throw error;
          set({ emailSubjects: data });
        } catch (err) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      // Set Active Email Body
      setActiveEmailBody: (template) => {
        set({ activeEmailBody: template });
      },
      // Set Active Email Body
      setActiveEmailSubject: (template) => {
        set({ activeEmailSubject: template });
      },

      // Delete template
      deleteTemplate: async (templateId, type) => {
        try {
          const { error } = await supabase
            .from("templates")
            .delete()
            .eq("id", templateId);

          if (error) throw error;

          // Update local state after deletion
          if (type === "EmailBody") {
            set({
              emailBodies: get().emailBodies.filter((t) => t.id !== templateId),
            });
          } else if (type === "EmailSubject") {
            set({
              emailSubjects: get().emailSubjects.filter(
                (t) => t.id !== templateId
              ),
            });
          }
        } catch (err) {
          console.error("Delete error:", err.message);
          set({ error: err.message });
        }
      },

      resetStore: () => 
        set({ 
          leads: [],
          emailBodies: [],
          emailSubjects: [],
          activeEmailSubject: null,
          activeEmailBody: null,
          loading: false,
          error: null,
          userId: null }),
    }),
    { name: "app-storage" }
  )
);

export default useStore;
