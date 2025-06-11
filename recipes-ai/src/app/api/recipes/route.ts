import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { ingredients } = await request.json();

    if (!ingredients) {
      return NextResponse.json(
        { error: 'Ingredientes são obrigatórios' },
        { status: 400 }
      );
    }

    const prompt = `
Liste 5 receitas simples usando os seguintes ingredientes: ${ingredients}.
Para cada receita, forneça:

- Título em português
- Título em inglês
- Modo de preparo curto

Responda exatamente neste formato:

Título: [título em português]
Title: [título em inglês]
Receita: [modo de preparo curto]

Não adicione introduções ou conclusões.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente culinário objetivo. Sempre responda no formato exato solicitado, sem explicações extras.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const text = completion.choices[0].message?.content ?? '';

    const textClean = text.trim();

    const recipes = textClean
      .split(/\d+\.\s*/)    // Divide pelas numerações "1.", "2.", ...
      .filter(block => block.trim().length > 0)
      .map(block => {
        const titlePtMatch = block.match(/Título:\s*(.+)/);
        const titleEnMatch = block.match(/Title:\s*(.+)/);
        const recipeMatch = block.match(/Receita:\s*([\s\S]+)/);

        return {
          title: titlePtMatch ? titlePtMatch[1].trim() : '',
          title_en: titleEnMatch ? titleEnMatch[1].trim() : '',
          recipe: recipeMatch ? recipeMatch[1].trim() : '',
        };
      });

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar receitas' },
      { status: 500 }
    );
  }
}
