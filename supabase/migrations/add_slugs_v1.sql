
-- 1. Add slug columns
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.classifieds ADD COLUMN IF NOT EXISTS slug TEXT;

-- 2. Create unique indexes
-- Business: unique in city
CREATE UNIQUE INDEX IF NOT EXISTS idx_businesses_city_slug ON public.businesses (city_id, slug);
-- Classified: unique by city, type and slug
CREATE UNIQUE INDEX IF NOT EXISTS idx_classifieds_city_type_slug ON public.classifieds (city_id, type, slug);

-- 3. Basic slug generator function (Postgres side for initial backfill)
CREATE OR REPLACE FUNCTION generate_slug(t TEXT) RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(t, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- 4. Simple backfill (Note: In case of collisions, manual correction or sequential suffix might be needed)
-- This logic performs a basic update. The Domain layer will handle future uniqueness perfectly.
UPDATE public.businesses SET slug = generate_slug(name) WHERE slug IS NULL;
UPDATE public.classifieds SET slug = generate_slug(title) WHERE slug IS NULL;

-- 5. Ensure column is not null after backfill (Optional, depending on DB constraints preference)
-- ALTER TABLE public.businesses ALTER COLUMN slug SET NOT NULL;
-- ALTER TABLE public.classifieds ALTER COLUMN slug SET NOT NULL;
