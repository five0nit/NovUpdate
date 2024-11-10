"use client";

import React, { FC, useState, ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockCompanies } from '../../lib/mock-data';
import { Company, CompanySearchParams } from '../../lib/types';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../components/ui/select';

const CompaniesPage: FC = () => {
  const [searchParams, setSearchParams] = useState<CompanySearchParams>({});
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(mockCompanies);

  const handleSearchChange = (field: keyof CompanySearchParams, value: string) => {
    const newSearchParams = { ...searchParams, [field]: value || undefined };
    setSearchParams(newSearchParams);

    const filtered = mockCompanies.filter((company: Company) => 
      (!newSearchParams.query || 
        company.name.toLowerCase().includes(newSearchParams.query.toLowerCase()) ||
        company.description.toLowerCase().includes(newSearchParams.query.toLowerCase())) &&
      (!newSearchParams.industry || company.industry === newSearchParams.industry) &&
      (!newSearchParams.size || company.size === newSearchParams.size) &&
      (!newSearchParams.status || company.status === newSearchParams.status)
    );

    setFilteredCompanies(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Trade Professional
        </h1>
        <p className="text-lg text-gray-600">
          Browse verified local trade companies to help with your home renovation projects
        </p>
      </div>

      <div className="mb-8 grid md:grid-cols-3 gap-4">
        <Input 
          placeholder="Search by company name or service" 
          value={searchParams.query || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchChange('query', e.target.value)}
        />
        
        <Select 
          value={searchParams.industry || ''} 
          onValueChange={(value: string) => handleSearchChange('industry', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Trade Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-trades">All Trades</SelectItem>
            <SelectItem value="Plumbing">Plumbing</SelectItem>
            <SelectItem value="Electrical">Electrical</SelectItem>
            <SelectItem value="Carpentry">Carpentry</SelectItem>
            <SelectItem value="Handyman">Handyman</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={searchParams.size || ''} 
          onValueChange={(value: string) => handleSearchChange('size', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Company Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-sizes">All Sizes</SelectItem>
            <SelectItem value="Small">Small Business</SelectItem>
            <SelectItem value="Medium">Medium Business</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No Companies Found
          </h2>
          <p className="text-gray-500">
            Try adjusting your search or filters to find the right trade professional
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div 
              key={company.id} 
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {company.logoUrl && (
                    <Image 
                      src={company.logoUrl} 
                      alt={`${company.name} logo`} 
                      width={60} 
                      height={60} 
                      className="rounded-full mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {company.location}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {company.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div>
                    <span className="font-semibold">Founded:</span> {company.foundedYear}
                  </div>
                  <div>
                    <span className="font-semibold">Size:</span> {company.size}
                  </div>
                </div>

                {company.performance && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="font-semibold">Total Jobs:</span> {company.performance.totalJobs}
                      </div>
                      <div>
                        <span className="font-semibold">Avg Rating:</span> {company.performance.averageRating.toFixed(1)}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <Link href={`/companies/${company.id}`} className="w-full mr-2">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  {company.websiteUrl && (
                    <a 
                      href={company.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
