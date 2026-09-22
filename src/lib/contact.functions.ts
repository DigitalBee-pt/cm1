import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        nome: z.string().trim().min(1),
        email: z.string().trim().email(),
        telefone: z
          .string()
          .trim()
          .regex(/^\d{9}$/, "O telefone deve ter 9 dígitos.")
          .optional()
          .default(""),
      })
      .parse(data)
  )
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env["VITE_SUPABASE_URL"]!,
      process.env["VITE_SUPABASE_PUBLISHABLE_KEY"]!
    );

    const { error } = await supabase.from("contact_requests").insert({
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
    });
    if (error) throw new Error(error.message);

    return { ok: true as const };
  });
