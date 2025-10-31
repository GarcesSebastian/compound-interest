import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Código QR - Calculadora de Interés Compuesto',
  description: 'Escanea el código QR para acceder al sistema',
};

export default function QRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center p-4 sm:p-8 relative">
      <Link 
        href="/"
        className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 text-slate-400 hover:text-slate-900 dark:text-slate-600 dark:hover:text-slate-100 transition-all opacity-30 hover:opacity-100 group"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm sm:text-base font-medium">Volver</span>
      </Link>

      <div className="text-center space-y-6 sm:space-y-8 max-w-4xl w-full">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100">
          Escanea el código QR
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400">
          Para acceder al sistema de interés compuesto
        </p>
        
        <div className="flex justify-center items-center p-4 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-2xl">
          <Image
            src="/qr-code.jpg"
            alt="Código QR del sistema"
            width={600}
            height={600}
            className="w-full max-w-lg sm:max-w-2xl h-auto"
            priority
          />
        </div>
        
        <p className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-500 mt-6 sm:mt-8">
          Apunta tu cámara al código QR para comenzar
        </p>
      </div>
    </div>
  );
}
