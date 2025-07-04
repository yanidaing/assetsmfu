import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Navbar from '../../components/common/Navbar';
import AdminTable from '../../components/admin/AdminTable';
import FormModal from '../../components/common/FormModal';
import AdminRoute from '../../components/auth/AdminRoute';
import styles from '../../../styles/Home.module.css';

interface Department {
  id: number;
  name_th: string;
  name_en: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

const DepartmentManagementPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setDepartments(data);
      } else {
        console.error('Failed to fetch departments');
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAdd = () => {
    setEditingDepartment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string | number) => {
    try {
      const response = await fetch(`/api/departments/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete department');
      }

      await fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
      throw error;
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      const url = editingDepartment 
        ? `/api/departments/${editingDepartment.id}`
        : '/api/departments';
      
      const method = editingDepartment ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save department');
      }

      await fetchDepartments();
    } catch (error) {
      console.error('Error saving department:', error);
      throw error;
    }
  };

  const columns = [
    {
      key: 'name_th',
      label: 'Department Name (Thai)',
    },
    {
      key: 'name_en',
      label: 'Department Name (English)',
      render: (value: string) => value || '-'
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string) => value || '-'
    },
    {
      key: 'created_at',
      label: 'Created At',
      render: (value: string) => value ? new Date(value).toLocaleDateString('en-US') : '-'
    }
  ];

  const formFields = [
    {
      name: 'name_th',
      label: 'Department Name (Thai)',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter department name in Thai'
    },
    {
      name: 'name_en',
      label: 'Department Name (English)',
      type: 'text' as const,
      required: false,
      placeholder: 'Enter department name in English (optional)'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: false,
      placeholder: 'Enter additional details about the department (optional)'
    }
  ];

  return (
    <AdminRoute>
      <div className={styles.container}>
        <Head>
          <title>Department Management - Asset Management System</title>
          <meta name="description" content="Manage departments in the asset management system" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <AdminSidebar />

        <main className={styles.mainContent} style={{ marginLeft: '280px' }}>
          <Navbar title="" isAdmin={true} />
          <div className={styles.content} style={{ padding: '2rem' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '2rem',
              color: 'white',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <h1 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                margin: '0 0 0.5rem 0',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                Department Management
              </h1>
              <p style={{ 
                fontSize: '1.1rem', 
                margin: '0', 
                opacity: '0.9',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}>
                Add, edit, and manage departments in the system
              </p>
            </div>

            <AdminTable
              title="Departments"
              data={departments}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
              searchPlaceholder="Search departments..."
            />

            <FormModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleSubmit}
              fields={formFields}
              initialData={editingDepartment || {}}
              title={editingDepartment ? 'Edit Department' : 'Add Department'}
              submitText={editingDepartment ? 'Update Department' : 'Add Department'}
            />
          </div>
        </main>
      </div>
    </AdminRoute>
  );
};

export default DepartmentManagementPage; 