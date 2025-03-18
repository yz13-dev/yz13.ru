"use client";

import { PanelLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useSidebar } from "mono/components/sidebar";

const SidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
      <PanelLeftIcon size={16} />
    </Button>
  );
};

export default SidebarTrigger;
