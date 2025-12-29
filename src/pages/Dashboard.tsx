import { MainLayout } from '@/components/layout/MainLayout';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

const Dashboard = () => {
  return (
    <MainLayout>
      <AdminDashboard />
    </MainLayout>
  );
};

export default Dashboard;