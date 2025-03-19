
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

const Index = () => {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardOverview />
    </DashboardLayout>
  );
};

export default Index;
