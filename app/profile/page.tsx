'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Project, Company } from '@/lib/types';
import { mockCompanies, mockProjects, mockUser } from '@/lib/mock-data';

export default function ProfilePage() {
  const [user, setUser] = useState<User>(mockUser);
  const [activeTab, setActiveTab] = useState<string>('personal');

  const renderPersonalInfo = () => (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <img 
            src={user.profilePictureUrl || '/images/testimonial-1.svg'} 
            alt={`${user.firstName} ${user.lastName}`} 
            className="w-24 h-24 rounded-full"
          />
          <div>
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phoneNumber || 'Not provided'}</p>
          </div>
        </div>
        {user.address && (
          <div className="mt-4">
            <h3 className="font-semibold">Address</h3>
            <p>{user.address.street}</p>
            <p>{user.address.city}, {user.address.state} {user.address.postalCode}</p>
            <p>{user.address.country}</p>
          </div>
        )}
        <div className="mt-4">
          <Button variant="outline">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderProjects = () => (
    <Card>
      <CardHeader>
        <CardTitle>My Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.projects?.map((project: Project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Button>Create New Project</Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderSavedCompanies = () => (
    <Card>
      <CardHeader>
        <CardTitle>Saved Companies</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.savedCompanies?.map((company: Company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderPreferences = () => (
    <Card>
      <CardHeader>
        <CardTitle>User Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <strong>Notifications:</strong> {user.preferences?.notifications ? 'Enabled' : 'Disabled'}
          </div>
          <div>
            <strong>Dark Mode:</strong> {user.preferences?.darkMode ? 'Enabled' : 'Disabled'}
          </div>
          <div>
            <strong>Language:</strong> {user.preferences?.language || 'English'}
          </div>
          <div className="flex space-x-4">
            <Button variant="outline">Edit Preferences</Button>
            <Button variant="destructive">Reset to Default</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="companies">Saved Companies</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">{renderPersonalInfo()}</TabsContent>
        <TabsContent value="projects">{renderProjects()}</TabsContent>
        <TabsContent value="companies">{renderSavedCompanies()}</TabsContent>
        <TabsContent value="preferences">{renderPreferences()}</TabsContent>
      </Tabs>
    </div>
  );
}
