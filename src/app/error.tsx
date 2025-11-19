'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center p-4">
      <h2 className="text-2xl font-bold text-red-500">Bir şeyler yanlış gitti!</h2>
      <p className="text-gray-400 max-w-md">
        Sayfa yüklenirken beklenmedik bir hata oluştu. Lütfen tekrar deneyin.
      </p>
      <div className="flex gap-2">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          variant="default"
        >
          Tekrar Dene
        </Button>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
        >
          Sayfayı Yenile
        </Button>
      </div>
    </div>
  );
}

