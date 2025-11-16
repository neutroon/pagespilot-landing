"use client";
import { useRouter } from "next/navigation";

export default function ManagerPage() {
  const router = useRouter();
  router.push("manager/dashboard");
}
