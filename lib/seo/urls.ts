
export const Urls = {
  business: (citySlug: string, businessSlug: string) => `/${citySlug}/negocio/${businessSlug}`,
  classified: (citySlug: string, type: string, classifiedSlug: string) => `/${citySlug}/classificados/${type}/${classifiedSlug}`,
  event: (citySlug: string, eventSlug: string) => `/${citySlug}/eventos/${eventSlug}`,
  city: (citySlug: string) => `/${citySlug}`,
};
