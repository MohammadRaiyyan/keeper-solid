import type { ParentComponent } from "solid-js";
import Navbar from "./Navbar/Navbar";
import { AppSidebar } from "./Sidebar";
import { SidebarProvider } from "./ui/sidebar";

const Layout: ParentComponent = (props) => {
  return (
    <SidebarProvider>
      <div class="flex min-h-screen  w-full overflow-hidden">
        <AppSidebar />
        <div class="flex flex-col flex-1 h-screen overflow-hidden relative">
          <Navbar />
          <main class="flex-1 p-4 md:p-6 overflow-auto  h-[calc(100vh-64px)]">
            {props.children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
