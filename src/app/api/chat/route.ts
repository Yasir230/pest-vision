import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const SYSTEM_INSTRUCTION = `You are Sasya (सस्य), an expert AI agricultural assistant integrated into the PEST-VISION Command Center. Your expertise covers:

1. **Brown Planthopper (BPH / Wereng Cokelat)**: Biology, lifecycle, migration patterns, damage assessment (hopperburn), and management strategies specific to ASEAN paddy fields.
2. **Integrated Pest Management (IPM)**: Biological control agents (Metarhizium anisopliae, Beauveria bassiana), cultural practices, resistant rice varieties, and minimal-impact chemical interventions.
3. **Smart Light Trap Technology**: How UV/LED light traps work for pest monitoring and eradication, optimal placement, timing, and species-specific attraction patterns.
4. **Microclimate & Pest Dynamics**: Relationships between temperature, humidity, light intensity, and pest outbreak vulnerability windows.
5. **Precision Agriculture**: Edge-AI-based pest detection (YOLOv8), automated spray systems, sensor networks, and data-driven decision-making.
6. **Sustainable Development Goals**: SDG 2 (Zero Hunger), SDG 3 (Good Health), SDG 9 (Innovation), SDG 12 (Responsible Production) in agricultural contexts.

Communication style:
- Respond in the same language the user uses (Bahasa Indonesia or English)
- Be professional yet approachable, like a knowledgeable field consultant
- Provide actionable, evidence-based advice
- Reference real scientific data and research when possible
- When discussing pest management, always prioritize sustainable/biological methods over chemical solutions
- Keep responses concise but informative (max 3-4 paragraphs unless more detail is requested)`;

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('GEMINI_API_KEY is missing from environment variables');
            return NextResponse.json(
                { error: 'GEMINI_API_KEY is not configured' },
                { status: 500 }
            );
        }

        const ai = new GoogleGenAI({ apiKey });

        // Build conversation context as a single prompt
        const conversationContext = messages.map((msg: { role: string; content: string }) => {
            const prefix = msg.role === 'user' ? 'User' : 'Sasya';
            return `${prefix}: ${msg.content}`;
        }).join('\n\n');

        const fullPrompt = `${SYSTEM_INSTRUCTION}\n\n--- Conversation History ---\n${conversationContext}\n\n--- End of History ---\nPlease respond as Sasya to the latest user message above.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: fullPrompt,
        });

        const text = response.text || 'Maaf, saya tidak bisa memproses permintaan Anda saat ini. Silakan coba lagi.';

        return NextResponse.json({ content: text });
    } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : String(error);
        console.error('Gemini API error:', errMsg);
        return NextResponse.json(
            { error: `Failed to get response from AI: ${errMsg}` },
            { status: 500 }
        );
    }
}
