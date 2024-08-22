"use client"
import { useParams } from "next/navigation";

export default function Page() {
  const { slug } = useParams();
  console.log(slug);
  return <div>Employees</div>;
}
