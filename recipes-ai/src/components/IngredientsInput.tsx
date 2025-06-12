'use client';

import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

interface IngredientsInputProps {
  onChange?: (tags: string[]) => void;
  initialTags?: string[];
}

export default function IngredientsInput({ onChange, initialTags = [] }: IngredientsInputProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState('');

  // Adiciona tag nova, evitando duplicatas e string vazia
  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const newTags = [...tags, trimmed];
      setTags(newTags);
      onChange?.(newTags);
    }
  };

  // Remove tag pelo índice
  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange?.(newTags);
  };

  // Ao apertar Enter, adiciona tag
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-wrap gap-2 border rounded p-2 bg-white w-full">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center bg-white text-black rounded px-2 py-1 text-sm p-2 border border-blue-100"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="ml-1 font-bold hover:text-gray-300"
          >
            ×
          </button>
        </div>
      ))}
      <input
        className="flex-grow min-w-[100px] outline-none text-black"
        type="text"
        placeholder="Digite ingrediente e aperte enter"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
