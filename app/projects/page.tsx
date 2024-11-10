"use client";

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { getProjects, createProject } from "@/lib/mock-data";
import { Project, ProjectSearchParams } from "@/lib/types";

// Placeholder components for missing UI elements
const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea 
    {...props} 
    className={`w-full border rounded p-2 ${props.className}`}
  />
);

const Dialog: React.FC<{
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ children, open, onOpenChange }) => (
  open ? <div>{children}</div> : null
);

const DialogContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      {children}
    </div>
  </div>
);

const DialogHeader: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

const DialogTitle: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
);

const ProjectsPage: React.FC = () => {
  const [searchParams, setSearchParams] = React.useState<ProjectSearchParams>({});
  const [page, setPage] = React.useState<number>(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState<boolean>(false);
  const [newProject, setNewProject] = React.useState<Partial<Project>>({
    status: 'Pending',
    startDate: new Date().toISOString().split('T')[0]
  });
  const pageSize = 10;

  const { projects, total, page: currentPage } = getProjects({ 
    page, 
    pageSize, 
    searchParams 
  });

  const totalPages = Math.ceil(total / pageSize);

  const handleSearchChange = (field: keyof ProjectSearchParams, value: string) => {
    setSearchParams((prev: ProjectSearchParams) => ({
      ...prev,
      [field]: value || undefined
    }));
    setPage(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject((prev: Partial<Project>) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!newProject.name || !newProject.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Create the project with all required fields
    createProject({
      name: newProject.name,
      description: newProject.description,
      status: newProject.status || 'Pending',
      startDate: newProject.startDate || new Date().toISOString().split('T')[0],
      companyId: newProject.companyId || '1', // Default to first company
      endDate: newProject.endDate
    });
    
    // Reset form and close modal
    setNewProject({ 
      status: 'Pending',
      startDate: new Date().toISOString().split('T')[0]
    });
    setIsCreateModalOpen(false);
  };

  const getStatusBadgeVariant = (status: Project['status']): 'secondary' | 'outline' | 'default' => {
    switch(status) {
      case 'Pending': return 'secondary';
      case 'In Progress': return 'outline';
      case 'Completed': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Projects</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create New Project
        </Button>
      </div>

      <div className="mb-6 flex space-x-4">
        <Input 
          placeholder="Search projects..." 
          value={searchParams.query || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange('query', e.target.value)}
          className="flex-grow"
        />
        
        <Select 
          value={searchParams.status || ''} 
          onValueChange={(value: string) => handleSearchChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Project Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={searchParams.tradeType || ''} 
          onValueChange={(value: string) => handleSearchChange('tradeType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Trade Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Trades</SelectItem>
            <SelectItem value="Plumbing">Plumbing</SelectItem>
            <SelectItem value="Electrical">Electrical</SelectItem>
            <SelectItem value="Carpentry">Carpentry</SelectItem>
            <SelectItem value="Handyman">Handyman</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <Card key={project.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{project.name}</CardTitle>
              <Badge variant={getStatusBadgeVariant(project.status)}>
                {project.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {project.description}
              </p>
              <div className="space-y-1">
                <p className="text-sm">
                  <strong>Start Date:</strong> {project.startDate}
                </p>
                {project.endDate && (
                  <p className="text-sm">
                    <strong>End Date:</strong> {project.endDate}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Company ID: {project.companyId}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No projects found. Create your first project!
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, total)} of {total} projects
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setPage((p: number) => Math.max(1, p - 1))} 
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button 
            onClick={() => setPage((p: number) => (p < totalPages ? p + 1 : p))} 
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitProject} className="space-y-4">
            <Input 
              name="name"
              placeholder="Project Name"
              value={newProject.name || ''}
              onChange={handleInputChange}
              required
            />
            <Textarea 
              name="description"
              placeholder="Project Description"
              value={newProject.description || ''}
              onChange={handleInputChange}
              required
            />
            <Select 
              name="status"
              value={newProject.status || 'Pending'}
              onValueChange={(value: string) => setNewProject((prev: Partial<Project>) => ({ ...prev, status: value as Project['status'] }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Project Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              name="startDate"
              type="date"
              placeholder="Start Date"
              value={newProject.startDate || ''}
              onChange={handleInputChange}
              required
            />
            <Input 
              name="endDate"
              type="date"
              placeholder="End Date (Optional)"
              value={newProject.endDate || ''}
              onChange={handleInputChange}
            />
            <Input 
              name="companyId"
              placeholder="Company ID"
              value={newProject.companyId || ''}
              onChange={handleInputChange}
            />
            <Button type="submit" className="w-full">
              Create Project
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsPage;
