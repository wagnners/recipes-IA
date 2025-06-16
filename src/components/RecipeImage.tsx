'use client'

import { useEffect, useState } from 'react';

type Props = {
  title: string;
};

export default function RecipeImage({ title }: Props) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const query = encodeURIComponent(title + ' dish cooked plated food');
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
        );
        const data = await res.json();
        const image = data?.results?.[0]?.urls?.regular;
        setSrc(image || null);
      } catch (err) {
        console.error('Erro ao buscar imagem:', err);
      }
    };

    fetchImage();
  }, [title]);

  if (!src) return null;

  return (
    <img
      src={src}
      alt={title}
      className="rounded mb-2 w-full h-48 object-cover"
    />
  );
}
