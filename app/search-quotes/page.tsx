"use client";

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Mock data - replace with actual data source
const MOCK_QUOTES = [
  { 
    id: 1, 
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", 
    author: "Winston Churchill", 
    category: "Motivation" 
  },
  { 
    id: 2, 
    text: "Innovation distinguishes between a leader and a follower.", 
    author: "Steve Jobs", 
    category: "Business" 
  },
  // Add more mock quotes
];

const CATEGORIES = [
  "Motivation", 
  "Business", 
  "Personal Growth", 
  "Leadership", 
  "Innovation"
];

export default function SearchQuotesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuotes, setFilteredQuotes] = useState(MOCK_QUOTES);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const authors = [...new Set(MOCK_QUOTES.map(quote => quote.author))];

  useEffect(() => {
    const filtered = MOCK_QUOTES.filter(quote => 
      quote.text.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? quote.category === selectedCategory : true) &&
      (selectedAuthor ? quote.author === selectedAuthor : true)
    );
    setFilteredQuotes(filtered);
  }, [searchQuery, selectedCategory, selectedAuthor]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedAuthor('');
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
          Search Quotes
        </h1>

        {/* Search Input */}
        <div className="relative mb-4">
          <Input 
            type="text"
            placeholder="Search quotes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full"
          />
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
            size={20} 
          />
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex justify-center mb-4">
          <Button 
            variant="ghost"
            onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
            className="flex items-center"
          >
            <Filter className="mr-2 h-4 w-4" />
            {isAdvancedFilterOpen ? 'Hide' : 'Show'} Advanced Filters
            {isAdvancedFilterOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        {/* Advanced Filters */}
        {isAdvancedFilterOpen && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <label className="block mb-2 dark:text-gray-200">Category</label>
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2 dark:text-gray-200">Author</label>
              <Select 
                value={selectedAuthor} 
                onValueChange={setSelectedAuthor}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Author" />
                </SelectTrigger>
                <SelectContent>
                  {authors.map(author => (
                    <SelectItem key={author} value={author}>
                      {author}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Clear Filters */}
        {(selectedCategory || selectedAuthor) && (
          <div className="flex justify-center mb-4">
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="flex items-center"
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        )}

        {/* Search Results */}
        <div className="space-y-4">
          {filteredQuotes.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No quotes found. Try different search terms or filters.
            </div>
          ) : (
            filteredQuotes.map(quote => (
              <div 
                key={quote.id} 
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <p className="text-lg italic mb-4 dark:text-gray-200">
                  "{quote.text}"
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold dark:text-gray-300">
                      - {quote.author}
                    </p>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {quote.category}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Save Quote
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
