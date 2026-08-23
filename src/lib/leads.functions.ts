import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid work email").max(255),
  company: z.string().trim().max(120).optional(),
  need: z.string().trim().max(120).optional(),
  description: z.string().trim().max(2000).optional(),
  source: z.string().max(80).default("website"),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("consultation_requests").insert({
      name: data.name,
      email: data.email,
      company: data.company ?? null,
      goal: data.need ?? null,
      message: data.description ?? null,
      source: data.source,
    });

    if (error) throw new Error(error.message);

    return { ok: true };
  });
