export enum Domain {
  MOBILE = 'MOBILE',
  FIXED = 'FIXED',
  DATACENTER = 'DATACENTER', // 新增機房領域
  DEV = 'DEV',
  AI_DATA = 'AI_DATA',
  SECURITY = 'SECURITY',
  AGENT_MCP = 'AGENT_MCP'
}

export interface ExampleCategories {
  design: string[];      // 設計與建置
  complaint: string[];   // 客訴處理
  troubleshoot: string[]; // 障礙查修
}

export interface DomainConfig {
  id: Domain;
  label: string;
  icon: string;
  description: string;
  color: string;
  examples: ExampleCategories;
}

export interface GeneratedPrompt {
  title: string;
  content: string;
  tags: string[];
  thinking?: string;  // 思考過程 (僅在思考模式時存在)
}