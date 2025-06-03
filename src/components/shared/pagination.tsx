import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

export function PaginationControls({ currentPage, lastPage, onPageChange }: PaginationControlsProps) {
    const pageNumbers = Array.from({ length: lastPage }, (_, i) => i + 1);

    return (
        <nav className="flex items-center justify-center space-x-2 mt-6">
            {/* Previous Button */}
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="flex items-center"
            >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Prev
            </Button>

            {/* Page Numbers */}
            {pageNumbers.map(page => (
                <Button
                    key={page}
                    variant={page === currentPage ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
            ))}

            {/* Next Button */}
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(currentPage + 1)}
                className="flex items-center"
            >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
        </nav>
    );
}

// Example usage in your TopicsPage:

/*
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { ApiResponse, PaginatedResponse, TopicType } from '@/types/index.js';
import TopicModalForm from '@/components/topics/TopicModalForm';
import { PaginationControls } from '@/components/ui/pagination-controls';

export default function TopicsPage() {
  const [topicsData, setTopicsData] = useState<PaginatedResponse<TopicType>>();
  const [loading, setLoading] = useState(true);

  const fetchTopics = async (page: number = 1) => {
    setLoading(true);
    try {
      const res = await axios.get<ApiResponse<PaginatedResponse<TopicType>>>(`/api/topics?page=${page}`);
      setTopicsData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchTopics(page);
  };

  if (loading || !topicsData) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topicsData.data.map(topic => (
          <div key={topic.id} className="border rounded p-4">
            <h3 className="font-semibold">{topic.title}</h3>
            <p className="text-sm text-gray-600">{topic.description}</p>
          </div>
        ))}
      </div>

      <PaginationControls
        currentPage={topicsData.current_page}
        lastPage={topicsData.last_page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
*/
