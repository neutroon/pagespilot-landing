"use client";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();
  router.push("user/dashboard");
}
