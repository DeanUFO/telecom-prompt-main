
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION_BASIC, SYSTEM_INSTRUCTION_AUTONOMOUS } from "../constants";
import { Domain } from "../types";

export const generateTelecomPrompt = async (
  domain: Domain,
  userInput: string,
  customApiKey?: string,
  thinkingMode: boolean = false
): Promise<{
  prompt: string;
  thinking?: string;
}> => {
  // 優先使用使用者輸入的 Key，如果沒有則嘗試讀取環境變數（相容舊設定）
  const apiKey = customApiKey || process.env.API_KEY;

  // 檢查是否為空
  if (!apiKey || apiKey === '') {
    throw new Error(
      "API Key 未設定。請點擊右上角「設定」按鈕輸入您的 Gemini API Key。"
    );
  }

  try {
    // Initialize the client inside the function
    const ai = new GoogleGenAI({ apiKey });

    // 明確區分 Mobile 的子領域，避免模型預設偏向 Core Network
    const domainLabel = domain === Domain.MOBILE ? "行動網路 (Mobile Network - 包含 RAN 無線接取、RF 射頻優化、Core 核心網)" :
      domain === Domain.FIXED ? "固定網路 (Fixed Network)" :
        domain === Domain.DATACENTER ? "機房維運與基礎設施 (Data Center - Power, Cooling, Cabling)" :
          domain === Domain.DEV ? "軟體開發 (Software Development)" :
            domain === Domain.AI_DATA ? "AI 與數據分析 (AI & Data Analytics)" :
              domain === Domain.SECURITY ? "資訊安全 (Cybersecurity)" :
                "AI Agent 與 MCP 開發 (AI Agents & MCP Development)";

    const prompt = `
      領域: ${domainLabel}
      使用者需求: ${userInput}
      
      請根據上述領域與需求，產生一個高品質的 AI Prompt。
    `;

    // 根據模式選擇系統指令
    const systemInstruction = thinkingMode
      ? SYSTEM_INSTRUCTION_AUTONOMOUS
      : SYSTEM_INSTRUCTION_BASIC;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: thinkingMode ? 0.8 : 0.7,  // 思考模式提高創造性
      },
    });

    const fullText = response.text || "無法產生提示詞，請稍後再試。";

    // 解析回應，分離 <thinking> 與最終輸出
    if (thinkingMode) {
      const thinkingMatch = fullText.match(/<thinking>([\s\S]*?)<\/thinking>/);

      if (thinkingMatch) {
        return {
          thinking: thinkingMatch[1].trim(),
          prompt: fullText.replace(/<thinking>[\s\S]*?<\/thinking>/, '').trim()
        };
      }
    }

    return { prompt: fullText };
  } catch (error: any) {
    console.error("Error generating prompt:", error);

    // Map common errors to user-friendly messages
    if (error.message?.includes('403') || error.message?.includes('API key')) {
      throw new Error("API Key 無效或權限不足 (403)。請檢查您的金鑰是否正確。");
    }
    if (error.message?.includes('404')) {
      throw new Error("模型找不到 (404)。可能該區域尚未支援此模型。");
    }
    if (error.message?.includes('429')) {
      throw new Error("請求次數過多 (429)。請稍候再試。");
    }
    if (error.message?.includes('503')) {
      throw new Error("服務暫時無法使用 (503)。請稍後再試。");
    }

    // Fallback error
    throw new Error(error.message || "生成失敗，請檢查網路連線。");
  }
};
