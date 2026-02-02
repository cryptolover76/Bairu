
# BAIRU - Fase 1 (Backend & Domain)

O projeto **BAIRU** é um diretório de comércios locais, classificados e eventos, focado em SEO e escalabilidade.

## 🚀 Status Final da Fase 1 (Backend)

### Estrutura de Pastas Implementada (`apps/web`)

#### 📡 Camada de API (`app/api/`)
- `public/cities`: ✅ GET Listar cidades.
- `public/categories`: ✅ GET Categorias do diretório.
- `public/businesses`: ✅ GET Listar/Filtros/Slug.
- `public/classifieds`: ✅ GET Listar/Filtros/Slug.
- `public/events`: ✅ GET Atalho para eventos.
- `private/classifieds`: ✅ POST Criar anúncio.
- `private/reviews`: ✅ POST Avaliar comércio.
- `private/reports`: ✅ POST Denunciar conteúdo.
- `private/claims`: ✅ POST Reivindicar empresa.
- `private/add-requests`: ✅ POST Sugerir nova empresa.
- `admin/moderation`: ✅ GET Listar pendentes / PUT Aprovar/Rejeitar.

#### 🏛️ Camada de Domínio (`lib/domain/`)
- `cities.ts`: ✅ Lógica de busca e listagem de cidades.
- `categories.ts`: ✅ Lógica de categorias e classificados.
- `businesses.ts`: ✅ Lógica de comércios com geração automática de Slugs únicos.
- `classifieds.ts`: ✅ Lógica de classificados com suporte a eventos.
- `reviews.ts`: ✅ Gerenciamento de avaliações.
- `reports.ts`: ✅ Registro de denúncias.
- `claims.ts`: ✅ Processamento de reivindicações de posse.
- `addRequests.ts`: ✅ Fluxo de sugestão de novos locais.

#### 🛠️ Infraestrutura e SEO
- `lib/supabase/*`: ✅ Configuração SSR (Server/Browser/Auth).
- `lib/seo/*`: ✅ Gerador de slugs (`slugify`) e construtor de URLs amigáveis.
- `lib/validation/*`: ✅ Schemas Zod para todas as entradas de dados.
- `types/database.ts`: ✅ Interfaces TypeScript batendo com o schema do Postgres.

---

## 🛠️ Configuração e Execução

### 1. Corrigindo o erro "Missing script: dev"
Certifique-se de que o `package.json` foi criado na raiz do projeto. O comando `npm run dev` agora utilizará o Vite.

### 2. Variáveis de Ambiente (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=seu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key
SUPABASE_SERVICE_ROLE_KEY=sua_key (usar apenas em scripts de seed)
```

### 3. Rodar o Projeto
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Popular banco de dados (Cidades e Categorias)
npm run seed

# Testar se as APIs estão respondendo
npm run smoke-test
```

### 4. Storage (Bucket)
Configure no Supabase:
- Bucket: `classified-images`
- Políticas: Upload autenticado, Leitura pública.
- Limite: 2 imagens por classificado.

---

## ✅ Pronto para Fase 2 (Frontend)
O backend está centralizado e as regras de negócio estão isoladas nos serviços de domínio. Todo o conteúdo público já suporta busca por slugs, garantindo o melhor SEO desde o dia 1.
