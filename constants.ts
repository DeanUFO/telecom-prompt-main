
import { Domain, DomainConfig } from './types';

export const AI_TOOLS = [
  { 
    name: 'ChatGPT', 
    url: 'https://chatgpt.com/', 
    autoFill: false,
    color: 'hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200' 
  },
  { 
    name: 'Gemini', 
    url: 'https://gemini.google.com/', 
    autoFill: false,
    color: 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200' 
  },
  { 
    name: 'Claude', 
    url: 'https://claude.ai/new', 
    autoFill: false,
    color: 'hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200' 
  },
  { 
    name: 'NotebookLM', 
    url: 'https://notebooklm.google.com/', 
    autoFill: false,
    color: 'hover:bg-lime-50 hover:text-lime-600 hover:border-lime-200' 
  },
  { 
    name: 'Perplexity', 
    url: 'https://www.perplexity.ai/search', 
    queryParam: 'q', 
    autoFill: true, // 支援透過 URL 自動帶入
    color: 'hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200' 
  },
  { 
    name: 'MS Copilot', 
    url: 'https://copilot.microsoft.com/', 
    queryParam: 'q',
    autoFill: true, // 支援透過 URL 自動帶入
    color: 'hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200' 
  },
  { 
    name: 'Cursor', 
    url: 'https://www.cursor.com/', 
    autoFill: false,
    color: 'hover:bg-slate-100 hover:text-slate-800 hover:border-slate-300' 
  }
];

export const DOMAINS: DomainConfig[] = [
  {
    id: Domain.MOBILE,
    label: '行動網路 (Mobile)',
    icon: 'Signal',
    description: '5G/4G RAN, Core Network, RF 優化, 信令分析',
    color: 'bg-blue-600',
    examples: {
      design: [
        '規劃 Sub-6GHz 頻譜使用效率',
        '設定 Massive MIMO 波束成形參數',
        '比較 5G NSA Option 3x 與 Option 2 架構',
        '評估 5G Network Slicing 應用場景',
        '設計 VoNR (Voice over NR) 部署策略'
      ],
      complaint: [
        '排查特定區域用戶訊號不良 (Poor Coverage)',
        '分析 VIP 用戶 5G 網速低落 (Low Throughput)',
        '調查大型活動期間網路壅塞 (Congestion)',
        '處理室內收訊死角客訴 (Indoor Coverage)',
        '分析特定手機型號頻繁斷話'
      ],
      troubleshoot: [
        '分析 5G SA 掉話原因 (Drop Call Analysis)',
        '解釋 VoLTE SIP Call Flow 異常',
        '除錯 VoNR 語音品質 MOS 值低落',
        '診斷 5G 用戶無法註冊 (Reg Reject 503)',
        '查修 RRU 光纖 CPRI 介面告警'
      ]
    }
  },
  {
    id: Domain.FIXED,
    label: '固定網路 (Fixed)',
    icon: 'Router',
    description: '光纖網路, IP Routing (BGP/OSPF), 傳輸網, 數據中心網路',
    color: 'bg-emerald-600',
    examples: {
      design: [
        '規劃 ISP BGP Multihoming 策略',
        '設計 BGP Flowspec 防禦架構',
        '數據中心 Spine-Leaf 架構規劃',
        '規劃 IPv6 Dual Stack 遷移策略',
        '設定 MPLS L3VPN Inter-AS Option B'
      ],
      complaint: [
        '診斷光纖寬頻用戶間歇性斷線',
        '查修遊戲用戶高延遲卡頓 (Latency)',
        '排查企業 VPN 專線 BGP Flapping',
        '分析特定網站無法開啟 (DNS/Routing)',
        '處理大頻寬用戶測速不達標客訴'
      ],
      troubleshoot: [
        '排查 BGP Session Stuck in Active',
        '分析 BGP Route Leaking 事故',
        '排查 OSPF Neighbor Stuck in Exstart',
        '診斷 BRAS PPPoE 撥號失敗 (Auth Fail)',
        '查修 ROADM 傳輸網波道中斷 (LoS)'
      ]
    }
  },
  {
    id: Domain.DATACENTER,
    label: '機房維運 (Data Center)',
    icon: 'Server',
    description: '電力空調, 基礎設施, 環控系統, PUE 能效, 結構化佈線',
    color: 'bg-orange-600',
    examples: {
      design: [
        '規劃機房冷熱通道 (Hot/Cold Aisle) 配置',
        '設計 UPS N+1 冗餘電力架構',
        '計算高密度機櫃散熱需求 (CFM/KW)',
        '規劃 TIA-942 標準結構化佈線',
        '評估機房 DCIM 環控系統規格'
      ],
      complaint: [
        '分析機房 PUE 值過高原因',
        '調查特定機櫃局部熱點 (Hot Spot) 告警',
        '處理機房濕度過低導致靜電風險',
        '分析 UPS 電池放電時間不足',
        '排查機房漏水感知器異常誤報'
      ],
      troubleshoot: [
        '查修 CRAC 精密空調壓縮機跳脫',
        '診斷 STS (Static Transfer Switch) 切換失敗',
        '排查光纖配線架 (ODF) 埠口訊號衰減',
        '除錯發電機 ATS 自動啟動失敗',
        '檢測機櫃 PDU 過載跳電原因'
      ]
    }
  },
  {
    id: Domain.DEV,
    label: '程式開發 (Dev)',
    icon: 'Code',
    description: 'OSS/BSS 系統, 自動化腳本, API 串接, 資料庫優化',
    color: 'bg-indigo-600',
    examples: {
      design: [
        '設計異常流量偵測告警系統',
        '設計 RESTful API 供網管監控',
        '使用 Ansible 部署伺服器組態',
        'Microservices 架構重構 BSS 計費模組',
        '使用 Kafka 處理即時信令串流'
      ],
      complaint: [
        '建立用戶障礙申告監控儀表板',
        '使用 NLP 分析大量客訴文字分類',
        '分析 App 用戶登入緩慢客訴',
        '查詢特定時段帳務出帳異常',
        '追蹤電子帳單發送失敗原因'
      ],
      troubleshoot: [
        '優化 SQL 查詢 CDR 效能 (Slow Query)',
        '排查 Microservices 504 Gateway Timeout',
        '診斷 K8s Node NotReady 導致 Pod 驅逐',
        '查修 API Gateway 憑證過期失效',
        '除錯 Python 自動化腳本 Memory Leak'
      ]
    }
  },
  {
    id: Domain.AI_DATA,
    label: 'AI & 數據 (AI/Data)',
    icon: 'BrainCircuit',
    description: 'AIOps, 機器學習, 生成式 AI, 大數據分析',
    color: 'bg-purple-600',
    examples: {
      design: [
        '建置 RAG 架構搜尋 3GPP 技術規範',
        '開發用戶流失預測模型 (Churn Prediction)',
        '設計 AIOps 網路告警關聯系統',
        '訓練客服專用 LLM 微調 (Fine-tuning)',
        '分析基地台節能最佳化演算法'
      ],
      complaint: [
        '實作語音轉文字 (STT) 分析客訴情緒',
        '分析用戶投訴熱點與網路品質關聯',
        '預測潛在客訴爆發區域',
        '自動生成客訴處理結案報告',
        '分析客服 Chatbot 回答準確度'
      ],
      troubleshoot: [
        '排查 GPU OOM 導致推論崩潰',
        '診斷 Airflow DAG 排程任務卡住',
        '查修 RAG 檢索準確度下降原因',
        '分析模型 Concept Drift 導致準確度衰退',
        '除錯分散式訓練節點同步失敗'
      ]
    }
  },
  {
    id: Domain.SECURITY,
    label: '資訊安全 (Security)',
    icon: 'Shield',
    description: '滲透測試, 網路防禦, 合規稽核, 5G 安全',
    color: 'bg-red-600',
    examples: {
      design: [
        '規劃 5G 核心網 Zero Trust 架構',
        '評估 3GPP SEPP 安全性架構',
        '設計 GDPR 用戶資料去識別化方案',
        '撰寫 Router/Switch GCB 加固腳本',
        '建立 SOC 自動化回應劇本 (Playbook)'
      ],
      complaint: [
        '查修 WAF 誤擋正常用戶 (False Positive)',
        '調查用戶帳號遭盜用異常登入',
        '處理用戶收到釣魚簡訊申訴',
        '分析 DDoS 導致用戶連線中斷客訴',
        '說明資安政策導致的服務存取限制'
      ],
      troubleshoot: [
        '分析 Log4j 漏洞對系統影響',
        '排查 IPSec VPN 通道建立失敗',
        '診斷 EDR Agent 佔用 CPU 過高',
        '檢查 SS7/Diameter 信令防火牆漏洞',
        '分析 APT 攻擊內網橫向移動軌跡'
      ]
    }
  },
  {
    id: Domain.AGENT_MCP,
    label: 'Agent & MCP',
    icon: 'Bot',
    description: 'AI Agent 流程, MCP Server 開發, 工具調用 (Tool Use)',
    color: 'bg-teal-600',
    examples: {
      design: [
        '架設自託管 MCP Server 主機環境',
        '設定 Nginx 反代 MCP SSE 端點',
        '使用 Docker 容器化部署 MCP',
        '設計 ReAct Agent 自動查修流程',
        '定義 MCP Server Resources 介面'
      ],
      complaint: [
        '設計人工審核 (Human-in-the-loop) 機制',
        '分析 Agent 回答幻覺 (Hallucination)',
        '優化 Agent 對應憤怒用戶的語氣',
        '追蹤 Agent 未能解決的客訴案件',
        '調整 RAG 策略改善回答相關性'
      ],
      troubleshoot: [
        '排查 MCP JSON-RPC 解析錯誤',
        '診斷 Agent 陷入無窮迴圈 (Loop)',
        '查修 MCP Client 無法連線 Local Server',
        '除錯 Tool Call 參數格式錯誤',
        '分析 SSE 連線中斷原因'
      ]
    }
  }
];

// 思考框架 - 內部推理結構
export const THINKING_FRAMEWORK = `
## 🧠 內部推理流程 (請在 <thinking> 標籤內執行，使用者可選擇是否查看)

<thinking>

### 步驟 1: 需求解析 (Requirement Analysis)
- 核心問題: [一句話描述使用者的真正需求]
- 技術層級: [L1 基礎設施 / L2 網路協定 / L3 應用服務]
- 關鍵字提取: [列出 3-5 個技術關鍵字]
- 隱含需求: [使用者可能沒說但需要的資訊]

### 步驟 2: 領域專家定位 (Expert Role Selection)
- 主要角色: [最適合的專家職稱]
- 次要角色: [若需跨領域，列出輔助角色]
- 技術深度: [初階 / 中階 / 高階 / 專家級]
- 標準依據: [3GPP TS/RFC/TIA-942/IEEE 等相關規範]

### 步驟 3: 提示詞結構規劃 (Prompt Structure Design)
- 角色設定: [具體的專家身份]
- 任務描述: [清晰的目標陳述]
- 技術重點: [3-5 個必須涵蓋的技術點]
- 輸出格式: [最適合的呈現方式]
- 品質標準: [可驗證的指標或檢查點]

### 步驟 4: 自我驗證 (Self-Verification)
- [ ] 是否包含具體技術參數？(頻率/功率/延遲/頻寬等)
- [ ] 是否引用相關標準規範？
- [ ] 是否提供可執行的步驟或檢查清單？
- [ ] 是否考慮實務限制？(成本/時間/資源)
- [ ] 輸出格式是否符合使用者需求？

### 步驟 5: 風險評估 (Risk Assessment)
- 可能的誤解: [使用者可能誤解的技術點]
- 需要澄清: [建議使用者補充的資訊]
- 替代方案: [若主要方法不可行的備案]

</thinking>
`;

// 基礎版系統指令 (保留原有邏輯)
export const SYSTEM_INSTRUCTION_BASIC = `
你是一個專業的「提示詞工程師 (Prompt Engineer)」，專門服務於電信業的技術專家。
你的任務是根據使用者的簡短需求，撰寫一個結構精簡、專業且明確的 AI 提示詞 (Prompt)。
請省略過多的背景鋪陳，直接切入技術重點。

【重要：子領域判斷規則】
若領域為「行動網路 (Mobile Network)」，請務必依據使用者關鍵字區分「RAN (無線端)」與「Core (核心端)」：
1. RAN/RF 關鍵字 (訊號, 覆蓋, 天線, 頻譜, gNB, eNB, RRU, Beamforming, MIMO, 掉話, 干擾) 
   -> [角色] 必須設定為：資深無線網路優化工程師 (Senior RF Optimization Engineer) 或 RAN 工程師。
   -> [重點] 需包含：RSRP/SINR 指標、天線調整、Air Interface 參數。
2. Core 關鍵字 (註冊, 漫遊, PDU Session, AMF, UPF, IMS, VoLTE Flow, 核心網) 
   -> [角色] 設定為：核心網路架構師 (Core Network Architect)。

若領域為「機房維運 (Data Center)」，請專注於實體基礎設施 (Facility)：
1. 電力/空調/環控 關鍵字 (UPS, PUE, CRAC, 發電機, 溫度, 機櫃, 佈線)
   -> [角色] 設定為：機房維運經理 (Data Center Facility Manager) 或 基礎設施工程師。
   -> [重點] 需包含：可用性 (Availability), 冗餘設計 (N+1/2N), TIA-942 標準, 節能減碳。

產出規則 (Lite Version)：
1. 語言：繁體中文 (Traditional Chinese)。
2. 結構 (請嚴格遵守)：
   - [角色]: 設定最精確的技術職稱 (例如: RF 工程師、BGP 網路專家、K8s 維運人員、機房維運經理)。
   - [任務]: 一句話描述要解決的問題。
   - [重點]: 3-5 點關鍵技術要求 (包含具體的 3GPP/TIA-942 標準、協定細節、SLA、環境限制)。
   - [格式]: 指定輸出形式 (例如: 查修步驟 CheckList、Python 程式碼、架構圖 Mermaid、JSON)。

請直接輸出設計好的提示詞，不要包含任何開場白或額外說明。
`;

// 自主思考版系統指令 (包含推理過程)
export const SYSTEM_INSTRUCTION_AUTONOMOUS = `
你是一個具備**深度推理能力**的專業「提示詞工程師 (Prompt Engineer)」，專門服務於電信業的技術專家。

${THINKING_FRAMEWORK}

## 📋 輸出規則

在生成提示詞之前，請先在 <thinking> 標籤內完成 5 個步驟的推理分析。
然後在 <thinking> 標籤外輸出最終的提示詞。

【重要：子領域判斷規則】
若領域為「行動網路 (Mobile Network)」，請務必依據使用者關鍵字區分「RAN (無線端)」與「Core (核心端)」：
1. RAN/RF 關鍵字 (訊號, 覆蓋, 天線, 頻譜, gNB, eNB, RRU, Beamforming, MIMO, 掉話, 干擾) 
   -> [角色] 必須設定為：資深無線網路優化工程師 (Senior RF Optimization Engineer) 或 RAN 工程師。
   -> [重點] 需包含：RSRP/SINR 指標、天線調整、Air Interface 參數。
2. Core 關鍵字 (註冊, 漫遊, PDU Session, AMF, UPF, IMS, VoLTE Flow, 核心網) 
   -> [角色] 設定為：核心網路架構師 (Core Network Architect)。

若領域為「機房維運 (Data Center)」，請專注於實體基礎設施 (Facility)：
1. 電力/空調/環控 關鍵字 (UPS, PUE, CRAC, 發電機, 溫度, 機櫃, 佈線)
   -> [角色] 設定為：機房維運經理 (Data Center Facility Manager) 或 基礎設施工程師。
   -> [重點] 需包含：可用性 (Availability), 冗餘設計 (N+1/2N), TIA-942 標準, 節能減碳。

產出規則：
1. 語言：繁體中文 (Traditional Chinese)。
2. 結構 (請嚴格遵守)：
   - [角色]: 設定最精確的技術職稱 (例如: RF 工程師、BGP 網路專家、K8s 維運人員、機房維運經理)。
   - [任務]: 一句話描述要解決的問題。
   - [重點]: 3-5 點關鍵技術要求 (包含具體的 3GPP/TIA-942 標準、協定細節、SLA、環境限制)。
   - [格式]: 指定輸出形式 (例如: 查修步驟 CheckList、Python 程式碼、架構圖 Mermaid、JSON)。

## 🎯 品質標準

每個生成的提示詞必須：
1. ✅ 包含至少 3 個具體技術參數或指標
2. ✅ 引用至少 1 個相關標準 (3GPP/RFC/TIA-942/IEEE)
3. ✅ 提供可驗證的輸出格式 (CheckList/程式碼/架構圖/數據表)
4. ✅ 考慮實務限制 (SLA/成本/時間/資源)
5. ✅ 避免過於籠統的描述

若無法滿足以上標準，請在 <thinking> 中說明原因並提供建議。

請先輸出 <thinking> 推理過程，再輸出最終提示詞。不要包含任何開場白或額外說明。
`;

// 預設使用基礎版 (向後相容)
export const SYSTEM_INSTRUCTION = SYSTEM_INSTRUCTION_BASIC;