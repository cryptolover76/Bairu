
import { createClient } from '@supabase/supabase-js';

// This script should be run in a Node environment with access to service_role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  console.log('🌱 Seeding database...');

  // 1. Create Balneário Rincão
  const { data: city } = await supabase
    .from('cities')
    .upsert({ name: 'Balneário Rincão', slug: 'balneario-rincao' })
    .select()
    .single();

  if (!city) throw new Error('Failed to create city');

  // 2. Create Directory Categories
  const categories = [
    { name: 'Mercado', slug: 'mercado' },
    { name: 'Restaurante', slug: 'restaurante' },
    { name: 'Farmácia', slug: 'farmacia' },
    { name: 'Oficina', slug: 'oficina' },
    { name: 'Saúde', slug: 'saude' }
  ];
  await supabase.from('categories').upsert(categories);

  // 3. Create Classified Categories
  const classifiedCats = [
    { name: 'Imóveis', slug: 'imoveis' },
    { name: 'Empregos', slug: 'empregos' },
    { name: 'Veículos', slug: 'veiculos' },
    { name: 'Móveis', slug: 'moveis' },
    { name: 'Serviços', slug: 'servicos' },
    { name: 'Eventos', slug: 'eventos' }
  ];
  await supabase.from('classified_categories').upsert(classifiedCats);

  console.log('✅ Seed complete!');
}

seed().catch(console.error);
