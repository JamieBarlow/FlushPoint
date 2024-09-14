import { Outlet } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function RootLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
