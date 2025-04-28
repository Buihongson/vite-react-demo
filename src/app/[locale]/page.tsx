import { MainLayout } from "@/components/layout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 animate-fade-in">
            Coming Soon
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 animate-fade-in-delay">
            We&apos;re working hard to bring you something amazing. Stay tuned!
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
