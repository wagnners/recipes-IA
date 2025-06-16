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
Liste exatamente 5 receitas simples usando os seguintes ingredientes: ${ingredients}.
Para cada receita, forneça:

- Título em português
- Título em inglês
- Modo de preparo detalhado (inclua etapas específicas, tempo de preparo, dicas de cozimento e instruções claras do início ao fim)
- Palavras-chave em inglês para representar a receita visualmente (evite palavras que possam gerar imagens de animais vivos, use termos como "dish", "cooked", "meal", "served")

Responda exatamente neste formato, repetindo ele 5 vezes:

Título: [título em português]
Title: [título em inglês]
Receita: [modo de preparo detalhado]
Keywords: [palavras-chave separadas por vírgula]

Não adicione introduções, enumerações ou conclusões.
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
      max_tokens: 2000,
      temperature: 0.7,
    });

    const text = completion.choices[0].message?.content ?? '';
    const textClean = text.trim();
    
    const recipes = textClean
      .split(/(?=Título:\s*)/) // Divide no início de cada "Título:"
      .filter(block => block.trim().length > 0)
      .map(block => {
        const titlePtMatch = block.match(/Título:\s*(.+)/);
        const titleEnMatch = block.match(/Title:\s*(.+)/);
        const recipeMatch = block.match(/Receita:\s*([\s\S]*?)(?=Keywords:|$)/);
        const keywordsMatch = block.match(/Keywords:\s*(.+)/);

        return {
          title: titlePtMatch?.[1]?.trim() ?? '',
          title_en: titleEnMatch?.[1]?.trim() ?? '',
          recipe: recipeMatch?.[1]?.trim() ?? '',
          keywords:
            keywordsMatch?.[1]
              ?.split(',')
              .map(k => k.trim())
              .filter(k => k.length > 0) ?? [],
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
