import React, { useMemo } from 'react';
import UniversityCard from '../components/UniversityCard';
import { MOCK_UNIVERSITIES } from '../constants';
import '../styles/Partners.css';

const Partners = () => {
  // generate between 10 and 15 items by cloning MOCK_UNIVERSITIES and varying images / ids
  const partners = useMemo(() => {
    const min = 10;
    const max = 15;
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const out = [];
    for (let i = 0; i < count; i++) {
      const src = MOCK_UNIVERSITIES[i % MOCK_UNIVERSITIES.length];
      out.push({
        ...src,
        id: `${src.id}-${i}`,
        // vary the image to make the grid feel diverse
        image: `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000) + i}`,
      });
    }
    return out.sort(() => Math.random() - 0.5);
  }, []);

  return (
    <div className="partners-page min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <header className="partners-hero text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our University Partners</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">A rotating selection of partner institutions we collaborate with. Discover programs, tuition ranges, and apply directly.</p>
        </header>

        <section className="partners-grid">
          {partners.map((u, idx) => (
            <div
              key={u.id}
              className="partners-item"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <UniversityCard university={u} onApply={() => alert(`Open ${u.name}`)} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Partners;
