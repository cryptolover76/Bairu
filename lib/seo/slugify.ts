
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .trim()
    .replace(/\s+/g, '-') // spaces to -
    .replace(/[^\w-]+/g, '') // remove non-word chars
    .replace(/--+/g, '-'); // collapse multiple -
}

export async function generateUniqueSlug(
  baseText: string,
  checkFn: (slug: string) => Promise<boolean>
): Promise<string> {
  const baseSlug = slugify(baseText);
  let slug = baseSlug;
  let counter = 1;

  while (!(await checkFn(slug))) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  return slug;
}
