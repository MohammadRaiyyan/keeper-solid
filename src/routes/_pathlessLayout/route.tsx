import { Outlet, createFileRoute } from "@tanstack/solid-router";
import Layout from "~/components/Layout";
import ManifestProvider from "../../context/ManifestProvider";

const DashboardLayout = () => {
  return (
    <ManifestProvider>
      <Layout>
          <Outlet />
       </Layout>
    </ManifestProvider>
  );
};

export const Route = createFileRoute("/_pathlessLayout")({
  component: DashboardLayout,
});
