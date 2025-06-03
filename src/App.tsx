
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import SkillTree from "./components/SkillTree";
import AutomationRiskAnalyzer from "./components/AutomationRiskAnalyzer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/skill-tree" element={<SkillTree />} />
            <Route path="/automation-risk" element={<AutomationRiskAnalyzer />} />
            <Route path="/curriculum" element={<div className="p-8 text-center text-gray-600">Curriculum Builder - Coming Soon</div>} />
            <Route path="/projects" element={<div className="p-8 text-center text-gray-600">Project Library - Coming Soon</div>} />
            <Route path="/community" element={<div className="p-8 text-center text-gray-600">Community Hub - Coming Soon</div>} />
            <Route path="/profile" element={<div className="p-8 text-center text-gray-600">User Profile - Coming Soon</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
