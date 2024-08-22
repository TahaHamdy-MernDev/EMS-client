import Header from "@/components/common/employee/Header";
import ProtectedRoutes from "@/components/ProtectedRoutes";
// import FcmTokenComp from "@/lib/firebase/firebaseForeground";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoutes>
      <Header />
      {/* <FcmTokenComp /> */}
      <main style={{ paddingTop: "3.5rem" }}>{children}</main>
    </ProtectedRoutes>
  );
}
