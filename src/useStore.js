// useStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "./supabaseClient";

const useStore = create(
  persist(
    (set, get) => ({
      leads: [],
      emailBodies: [],
      emailSubjects: [],
      campaigns: [],
      activeEmailSubject: null,
      activeEmailBody: null,
      activeCampaign: null,
      loading: false,
      error: null,
      userId: null,

      filters: {
        campaignId: null,
        stepNumber: null,
      },

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      // ✅ Execution control
      isExecuting: false,
      executionsToday: { Subject: 0, EmailBody: 0 },

      setUserId: (id) => set({ userId: id }),

      startExecution: (type) => {
        const { executionsToday } = get();
        set({
          isExecuting: true,
          executionsToday: {
            ...executionsToday,
            [type]: (executionsToday[type] || 0) + 1,
          },
        });
      },

      endExecution: () => set({ isExecuting: false }),

      resetDailyCounts: () =>
        set({ executionsToday: { Subject: 0, EmailBody: 0 } }),

      // ✅ Campaigns
      fetchCampaigns: async () => {
        set({ loading: true, error: null });
        try {
          const userId = get().userId;
          if (!userId) throw new Error("No user found");

          const { data, error } = await supabase
            .from("campaign")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

          if (error) throw error;
          set({ campaigns: data });
        } catch (err) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      createCampaign: async (name) => {
        try {
          const userId = get().userId;
          if (!userId) throw new Error("No user found");

          const { data, error } = await supabase
            .from("campaign")
            .insert([{ name, user_id: userId }])
            .select();

          if (error) throw error;

          set({ campaigns: [data[0], ...get().campaigns] });
          return data[0];
        } catch (err) {
          set({ error: err.message });
          throw err;
        }
      },

      deleteCampaign: async (id) => {
        try {
          const { error } = await supabase.from("campaign").delete().eq("id", id);
          if (error) throw error;

          set({
            campaigns: get().campaigns.filter((c) => c.id !== id),
          });
        } catch (err) {
          set({ error: err.message });
        }
      },

      // ✅ Leads
      fetchLeads: async () => {
        set({ loading: true, error: null });
        try {
          const userId = get().userId;
          if (!userId) throw new Error("No user found");

          const { data, error } = await supabase
            .from("extracted_leads")
            .select(
              `
              *,
              outreach_logs!left (
                step_number,
                campaign_id
              )
            `
            )
            .eq("user_id", userId);

          if (error) throw error;

          const processedLeads = data.map((lead) => {
            const logs = lead.outreach_logs || [];
            let current_step = 0;
            let current_campaign_id = null;

            if (logs.length > 0) {
              const latestLog = logs.reduce((a, b) =>
                a.step_number > b.step_number ? a : b
              );
              current_step = latestLog.step_number;
              current_campaign_id = latestLog.campaign_id;
            }

            return {
              ...lead,
              current_step,
              current_campaign_id,
            };
          });

          set({ leads: processedLeads });
        } catch (err) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      // ✅ Templates
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
            .eq("type", "Subject")
            .order("created_at", { ascending: false });

          if (error) throw error;
          set({ emailSubjects: data });
        } catch (err) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      setActiveCampaign: (campaign) => set({ activeCampaign: campaign }),
      setActiveEmailBody: (template) => set({ activeEmailBody: template }),
      setActiveEmailSubject: (template) => set({ activeEmailSubject: template }),

      deleteTemplate: async (templateId, type) => {
        try {
          const { error } = await supabase
            .from("templates")
            .delete()
            .eq("id", templateId);

          if (error) throw error;

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
          campaigns: [],
          activeEmailSubject: null,
          activeEmailBody: null,
          activeCampaign: null,
          loading: false,
          error: null,
          userId: null,
        }),
    }),
    {
      name: "app-storage", // ✅ single persist key
    }
  )
);

export default useStore;