/* ── AI Agent Status Types ────────────────────────────── */

export type AgentRole = 'research' | 'content' | 'design' | 'analytics' | 'support';
export type AgentStatus = 'active' | 'idle' | 'busy' | 'error';

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  status: AgentStatus;
  tasksCompleted: number;
  tasksInQueue: number;
  lastActivity: string;
  currentTask?: string;
  uptime: number;
  metrics: {
    avgResponseTime: number;
    successRate: number;
  };
}

export interface AgentStatusResponse {
  agents: Agent[];
  lastUpdated: string;
  systemHealth: 'healthy' | 'degraded' | 'offline';
}

export const AGENT_ROLE_CONFIG: Record<AgentRole, {
  label: string;
  color: string;
  icon: string;
  description: string;
}> = {
  research: {
    label: 'Research Agent',
    color: '#3b82f6',
    icon: 'search',
    description: 'Autonomous research agent',
  },
  content: {
    label: 'Content Agent',
    color: '#00d4aa',
    icon: 'edit',
    description: 'A content strategist',
  },
  design: {
    label: 'Design Agent',
    color: '#7c3aed',
    icon: 'palette',
    description: 'Design genie',
  },
  analytics: {
    label: 'Analytics Agent',
    color: '#f59e0b',
    icon: 'trending-up',
    description: '24/7 interactive analytics agent',
  },
  support: {
    label: 'Support Agent',
    color: '#f472b6',
    icon: 'headphones',
    description: 'Always-on support agent',
  },
};
