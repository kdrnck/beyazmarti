'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex h-screen flex-col items-center justify-center gap-4 text-center p-4 bg-background text-foreground">
          <h2 className="text-2xl font-bold text-red-500">Kritik bir hata oluştu!</h2>
          <p className="text-gray-400">
            Uygulama kritik bir hatayla karşılaştı. Lütfen sayfayı yenileyin.
          </p>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            onClick={() => reset()}
          >
            Tekrar Dene
          </button>
        </div>
      </body>
    </html>
  );
}

