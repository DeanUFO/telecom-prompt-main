import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import PptxGenJS from 'pptxgenjs';

const app = express();

// CORS 中間件
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'http://localhost:3001', 'http://localhost:3000'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  
  next();
});

app.use(bodyParser.json({ limit: '10mb' }));

// 健康檢查端點
app.get('/health', (req, res) => {
  res.json({ status: 'ok', port: process.env.PORT || 3001 });
});

// 聚合多個 AI 模型回應並生成 PPT
app.post('/api/aggregate', async (req, res) => {
  console.log('📨 Received aggregation request');
  const { prompt } = req.body;
  
  if (!prompt) {
    console.error('❌ No prompt provided');
    return res.status(400).json({ error: 'prompt required' });
  }

  console.log('🔍 Prompt received:', prompt.slice(0, 50) + '...');

  try {
    const results = {};

    // OpenAI (ChatGPT)
    if (process.env.OPENAI_API_KEY) {
      console.log('📞 Calling OpenAI API...');
      try {
        const r = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }], max_tokens: 800 }),
        });
        const j = await r.json();
        results.chatgpt = j.choices?.[0]?.message?.content || JSON.stringify(j, null, 2);
        console.log('✅ OpenAI success');
      } catch (e) {
        console.error('❌ OpenAI error:', e.message);
        results.chatgpt = `Error: ${e.message}`;
      }
    } else {
      console.log('⏭️  Skipping OpenAI (no API key)');
    }

    // Google Gemini
    if (process.env.GEMINI_API_KEY) {
      console.log('📞 Calling Gemini API...');
      try {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        });
        const j = await r.json();
        results.gemini = j.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(j, null, 2);
        console.log('✅ Gemini success');
      } catch (e) {
        console.error('❌ Gemini error:', e.message);
        results.gemini = `Error: ${e.message}`;
      }
    } else {
      console.log('⏭️  Skipping Gemini (no API key)');
    }

    // Claude (Anthropic)
    if (process.env.CLAUDE_API_KEY) {
      console.log('📞 Calling Claude API...');
      try {
        const r = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({ model: 'claude-3-haiku-20240307', max_tokens: 1024, messages: [{ role: 'user', content: prompt }] }),
        });
        const j = await r.json();
        results.claude = j.content?.[0]?.text || JSON.stringify(j, null, 2);
        console.log('✅ Claude success');
      } catch (e) {
        console.error('❌ Claude error:', e.message);
        results.claude = `Error: ${e.message}`;
      }
    } else {
      console.log('⏭️  Skipping Claude (no API key)');
    }

    // Perplexity
    if (process.env.PERPLEXITY_API_KEY) {
      console.log('📞 Calling Perplexity API...');
      try {
        const r = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ model: 'pplx-70b-online', messages: [{ role: 'user', content: prompt }], max_tokens: 800 }),
        });
        const j = await r.json();
        results.perplexity = j.choices?.[0]?.message?.content || JSON.stringify(j, null, 2);
        console.log('✅ Perplexity success');
      } catch (e) {
        console.error('❌ Perplexity error:', e.message);
        results.perplexity = `Error: ${e.message}`;
      }
    } else {
      console.log('⏭️  Skipping Perplexity (no API key)');
    }

    // 如果沒有任何結果，返回錯誤
    if (Object.keys(results).length === 0) {
      console.error('❌ No results - no API keys configured');
      return res.status(400).json({ error: 'No API keys configured. Please set at least one of: OPENAI_API_KEY, GEMINI_API_KEY, CLAUDE_API_KEY, PERPLEXITY_API_KEY' });
    }

    console.log('📊 Results collected:', Object.keys(results).join(', '));
    console.log('🎨 Generating PPTX...');

    // 生成 PPT
    const pres = new PptxGenJS();
    pres.title = 'AI Aggregation Results';
    pres.subject = prompt;
    pres.creator = 'Telecom Prompt Generator';

    // 標題頁
    const titleSlide = pres.addSlide();
    titleSlide.background = { color: '1F2937' };
    titleSlide.addText('AI Aggregation Results', { x: 0.5, y: 2.5, w: 9, h: 1.5, fontSize: 48, bold: true, color: 'FFFFFF', align: 'center' });
    titleSlide.addText(`Prompt: ${prompt.slice(0, 100)}...`, { x: 0.5, y: 4.2, w: 9, h: 1, fontSize: 18, color: 'D1D5DB', align: 'center', fontFace: 'Arial' });

    // 內容頁
    Object.entries(results).forEach(([k, v]) => {
      const slide = pres.addSlide();
      slide.background = { color: 'FFFFFF' };
      slide.addText(k.toUpperCase(), { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '1F2937' });
      
      const content = typeof v === 'string' ? v : JSON.stringify(v, null, 2);
      const truncated = content.length > 3500 ? content.slice(0, 3500) + '\n...' : content;
      
      slide.addText(truncated, {
        x: 0.5, y: 1.2, w: 9, h: 5.3, fontSize: 11, color: '374151', wrap: true, fontFace: 'Courier New',
      });
    });

    // 生成 PPTX 為 Base64
    console.log('💾 Writing PPTX to buffer...');
    const buffer = await pres.write({ outputType: 'arraybuffer' });
    const base64 = Buffer.from(buffer).toString('base64');

    console.log('📦 PPTX generated successfully, sending response...');
    res.json({ ok: true, pptx: base64, fileName: `ai-aggregation-${new Date().getTime()}.pptx` });
    console.log('✅ Response sent successfully');

  } catch (err) {
    console.error('❌ Aggregate error:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ error: err.message || 'internal error', stack: err.stack });
  }
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
  console.log('Environment variables:');
  console.log(`  OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '✅ set' : '❌ not set'}`);
  console.log(`  GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '✅ set' : '❌ not set'}`);
  console.log(`  CLAUDE_API_KEY: ${process.env.CLAUDE_API_KEY ? '✅ set' : '❌ not set'}`);
  console.log(`  PERPLEXITY_API_KEY: ${process.env.PERPLEXITY_API_KEY ? '✅ set' : '❌ not set'}`);
});

// 未處理的拒絕
process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
});

// 未捕獲的異常
process.on('uncaughtException', (err) => {
  console.error('⚠️ Uncaught Exception:', err);
});

