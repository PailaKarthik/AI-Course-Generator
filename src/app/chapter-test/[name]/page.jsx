"use client";
import Page from '@/components/chapter_content/page';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';

const ChapterPage = () => {
  const params = useParams(); 
  const searchParams = useSearchParams(); 
  const subtopic = searchParams.get('subtopic'); 

  return (
    <>
      <Page chapter={params.name} subtopic={subtopic} />
    </>
  );
};
export default ChapterPage;