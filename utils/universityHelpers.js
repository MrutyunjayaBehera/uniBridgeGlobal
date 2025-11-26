const RANDOM_UNIVERSITY_IMAGES = [
  'https://images.unsplash.com/photo-1541961017774-22e08e32d5fe?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1427504494785-cdfc073ef3e7?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1535016120754-fd58615ccadd?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1456973283519-e59621d47e5b?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1606536867914-006bf4c9d637?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1554079389-2b1c0c1c9c0c?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1516738901601-b53f3cc8652d?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1200&h=800&fit=crop',
];

export const getRandomImage = () => {
  return RANDOM_UNIVERSITY_IMAGES[Math.floor(Math.random() * RANDOM_UNIVERSITY_IMAGES.length)];
};

export const transformSupabaseUniversity = (inst) => ({
  id: inst.id,
  name: inst.name,
  location: `${inst.city || ''}${inst.city && inst.country ? ', ' : ''}${inst.country || ''}`,
  country: inst.country || 'Unknown',
  city: inst.city || '',
  type: inst.type || 'Institution',
  accreditation: inst.accreditation || '',
  // prefer image from DB if present, otherwise pick a random placeholder
  image: inst.image || inst.image_url || inst.logo_url || getRandomImage(),
  ranking: Math.floor(Math.random() * 100) + 1,
  tuition: `$${Math.floor(Math.random() * 40000) + 10000}/yr`,
  acceptanceRate: `${Math.floor(Math.random() * 40) + 20}%`,
  description: `${inst.type || 'This'} institution focused on academic excellence and student development`,
  programs: inst.programs && inst.programs.length > 0
    ? inst.programs.map(p => p.name || p.degree_level)
    : ['General Programs'],
});
