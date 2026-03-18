/**
 * Agente Safeguard: A11y Check
 * Gate 2 do pipeline — roda axe-core headless + Claude API para análise semântica de ARIA
 * Temperatura: 0 | Schema: JSON validado
 */
import { execSync } from 'child_process';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic(); // API key via ANTHROPIC_API_KEY env

interface A11yResult {
  passed: boolean;
  violations: unknown[];
  analysis?: string;
}

export async function runA11yCheck(componentPath: string): Promise<A11yResult> {
  // Step 1: axe-core deterministic check
  const axeResult = JSON.parse(
    execSync(`npx axe-core-cli ${componentPath} --format json`).toString()
  );

  const violations = axeResult.violations ?? [];

  // Step 2: Claude API semantic ARIA analysis (only if axe passes)
  if (violations.length > 0) {
    return { passed: false, violations };
  }

  const componentSource = execSync(`cat ${componentPath}`).toString();

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    temperature: 0,
    system: `You are a WCAG 2.2 AA/AAA accessibility expert. Analyze the React component and respond ONLY with valid JSON matching this schema:
{
  "passed": boolean,
  "issues": string[],
  "suggestions": string[]
}`,
    messages: [{ role: 'user', content: `Analyze this component for ARIA semantics, keyboard navigation, and screen reader compatibility:\n\n${componentSource}` }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '{}';
  const analysis = JSON.parse(text);

  return {
    passed: analysis.passed,
    violations: analysis.issues ?? [],
    analysis: JSON.stringify(analysis),
  };
}
