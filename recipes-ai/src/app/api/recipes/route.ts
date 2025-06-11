import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { ingredients } = await request.json();

    if (!ingredients) {
      return NextResponse.json({ error: 'Ingredientes são obrigatórios' }, { status: 400 });
    }

    // Prompt para a IA
    const prompt = `Liste 5 receitas simples usando estes ingredientes: ${ingredients}.`;

    // Chamada para OpenAI Chat Completion
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Você é um assistente que sugere receitas culinárias.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    // Resposta da IA
    const text = completion.choices[0].message?.content ?? '';

    // Quebrar texto em lista, supondo que são receitas em linhas
    const recipes = text.split('\n').filter(line => line.trim().length > 0);

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json({ error: 'Erro ao gerar receitas' }, { status: 500 });
  }
}
