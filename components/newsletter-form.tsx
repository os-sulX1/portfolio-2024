"use client";

import type { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsletterFormSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribe } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import DOMPurify from 'dompurify';
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

type Inputs = z.infer<typeof NewsletterFormSchema>;

export default function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const sanitizedData = {
      email: DOMPurify.sanitize(data.email),
    };

    const result = await subscribe(sanitizedData);

    if (result?.error) {
      toast.error("An error occurred! Please try again.");
      return;
    }

    toast.success("Subscribed successfully!");
    reset();
  };

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden rounded-lg border-0 bg-gradient-to-br from-primary/10 via-background to-primary/10 dark:border">
          <CardContent className="p-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-primary">Subscribe to my newsletter</h2>
                <p className="text-muted-foreground">
                  Get updates on my work and projects.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(processForm)}
                className="flex flex-col items-start gap-4 md:flex-row md:items-end"
              >
                <div className="w-full md:w-auto">
                  <Input
                    type="email"
                    id="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="w-full md:w-64"
                    {...register("email")}
                  />

                  {errors.email?.message && (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Subscribe <Mail className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              We care about your data. Read our{" "}
              <Link href="/privacy" className="font-medium underline underline-offset-4 hover:text-primary">
                privacy&nbsp;policy
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}