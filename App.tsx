
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">BAIRU Project</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-6 uppercase tracking-wider">Fase 1: Backend & Domínio</h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          O núcleo da plataforma BAIRU (Diretório, Classificados e Eventos) está pronto. 
          As APIs modulares, validações Zod, serviços de domínio e integração com Supabase foram implementados.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="font-bold text-green-800 mb-1">✅ Core Ready</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• API Slugs (SEO)</li>
              <li>• Validação Zod</li>
              <li>• Supabase Server/Client</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-1">🚀 Phase 2 Ready</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Next.js App Router API</li>
              <li>• Domain Services</li>
              <li>• Storage Configuration</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Consulte o <code>README.md</code> para instruções de seed e testes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
