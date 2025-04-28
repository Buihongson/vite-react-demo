import React from "react";
import type { Metadata } from "next";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Login | Fulfillment System",
};

export default function LoginPage() {
  return <SignInForm />;
}
