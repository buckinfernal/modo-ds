/**
 * Agente Safeguard: Critérios de Aceite
 * Gate 5 do pipeline — valida output do componente contra spec original do prompt
 * Temperatura: 0 | Schema: JSON validado
 */
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

interface CriteriaResult {
  passed: boolean;
  matchScore: number;
  gaps: string[];
}

export async function runCriteriaCheck(
  originalSpec: string,
  componentSource: string
): Promise<CriteriaResult> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    temperature: 0,
    system: `You are a strict design system QA engineer. Compare the component implementation against the original spec.
Respond ONLY with valid JSON matching this schema exactly:
{
  "passed": boolean,
  "matchScore": number (0-100),
  "gaps": string[]
}`,
    messages: [{
      role: 'user',
      content: `ORIGINAL SPEC:\n${originalSpec}\n\nCOMPONENT IMPLEMENTATION:\n${componentSource}\n\nDoes the implementation fulfill all spec criteria?`
    }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '{}';
  return JSON.parse(text);
}
