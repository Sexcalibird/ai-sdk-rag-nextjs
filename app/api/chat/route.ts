import { createResource } from '@/lib/actions/resources';
import { findRelevantContent } from '@/lib/ai/embedding';
import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, stepCountIs, streamText, tool, UIMessage } from 'ai';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { signOut } from 'next-auth/react';
import { authOptions } from '@/store/authOpt';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    // const { messages }: { messages: UIMessage[] } = await req.json();

    // const result = streamText({
    //     model: openai('gpt-4o'),
    //     system: `
    //         You are a helpful assistant. Check your knowledge base before answering any questions.
    //         Only respond to questions using information from tool calls.
    //         if no relevant information is found in the tool calls, respond, "Sorry, I don't know."
    //     `,
    //     messages: convertToModelMessages(messages),
    //     stopWhen: stepCountIs(5),
    //     tools: {
    //         addResource: tool({
    //             description: `
    //                 add a resource to your knowledge base.
    //                 If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.
    //             `,
    //             inputSchema: z.object({
    //                 content: z
    //                     .string()
    //                     .describe('the content or resource to add to the knowledge base'),
    //             }),
    //             execute: async ({ content }) => createResource({ content }),
    //         }),
    //         getInformation: tool({
    //             description: `get information from your knowledge base to answer questions.`,
    //             inputSchema: z.object({
    //                 question: z.string().describe('the users question'),
    //             }),
    //             execute: async ({ question }) => findRelevantContent(question),
    //         }),
    //         get_invoice_info: tool({
    //             description: 'Lấy thông tin hóa đơn người dùng theo tháng và năm.',
    //             inputSchema: z.object({
    //                 userId: z.string().describe('Id của người dùng'),
    //                 month: z.number().describe('Tháng của hóa đơn'),
    //                 year: z.number().describe('Năm của hóa đơn'),
    //             }),
    //             execute: async ({ userId, month, year }) => {
    //                 // return await getInvoiceInfo({ userId, month, year })
    //                 console.log(userId, month, year)
    //                 return `userId: ${userId} month: ${month} year: ${year}`
    //             },
    //         }),
    //     },
    // });

    // return result.toUIMessageStreamResponse();

    const session = await getServerSession(authOptions);

    try {
        // Extract messages from incoming request
        const payload = await req.json();

        // Forward request to NestJS backend
        const response = await fetch(process.env.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.user?.token}`
            },
            body: JSON.stringify(payload),
        });

        if (response.status === 401) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // If NestJS sends a stream (like text/event-stream)
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.includes('text/event-stream')) {
            // Pipe the stream directly back to the client
            return new Response(response.body, {
                headers: { 'Content-Type': 'text/event-stream' },
            });
        }

        // Otherwise, just return JSON
        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error('Chat proxy error:', error);
        return Response.json({ error: 'Failed to fetch from chatbot API' }, { status: 500 });
    }
}