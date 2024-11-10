"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCompanies } from "@/lib/mock-data";
import { Company } from "@/lib/types";

const CompanyDetailsPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();

  // Find the specific company from mock data
  const { companies } = getCompanies({});
  const company = companies.find(c => c.id === params.id);

  const handleBackToCompanies = () => {
    router.push('/companies');
  };

  const handleContactCompany = () => {
    if (company?.contactEmail) {
      window.location.href = `mailto:${company.contactEmail}`;
    } else {
      alert('No contact email is available for this company.');
    }
  };

  if (!company) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Company Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">The requested company could not be found.</p>
            <Button 
              className="w-full" 
              onClick={handleBackToCompanies}
            >
              Back to Companies
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{company.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Company Information</h2>
              <div className="space-y-2">
                <p><strong>Industry:</strong> {company.industry}</p>
                <p><strong>Location:</strong> {company.location}</p>
                <p><strong>Founded:</strong> {company.foundedYear}</p>
                <p><strong>Company Size:</strong> {company.size}</p>
                {company.websiteUrl && (
                  <p>
                    <strong>Website:</strong>{' '}
                    <a 
                      href={company.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline"
                    >
                      {company.websiteUrl}
                    </a>
                  </p>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p>{company.description}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between space-x-4">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handleBackToCompanies}
            >
              Back to Companies
            </Button>
            {company.contactEmail && (
              <Button 
                className="flex-1" 
                onClick={handleContactCompany}
              >
                Contact Company
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetailsPage;
