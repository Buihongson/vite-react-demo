import React from "react";
import type { Metadata } from "next";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Login | Fulfillment System",
};

export default function LoginPage() {
  return <SignUpForm />;
}
