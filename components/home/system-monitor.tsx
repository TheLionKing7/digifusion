'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { formatUptime } from '@/lib/utils/formatters';
import type { Agent } from '@/types/agent';
import { AGENT_ROLE_CONFIG } from '@/types/agent';

interface SystemMonitorProps {
  agents: Agent[];
}

export function SystemMonitor({ agents }: SystemMonitorProps) {
  const systemHealth = agents.every((a) => a.status === 'active' || a.status === 'idle')
    ? 'healthy'
    : agents.some((a) => a.status === 'error')
    ? 'degraded'
    : 'healthy';

  return (
    <section className="relative py-24 border-y border-border overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-background" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className={cn(
                  'w-2 h-2 rounded-full animate-pulse',
                  systemHealth === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400'
                )}
              />
              <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">
                System Status · Live
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              The Team Working{' '}
              <span className="text-gradient-accent">Behind the Scenes</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent, i) => {
            const config = AGENT_ROLE_CONFIG[agent.role];
            const statusColor =
              agent.status === 'active'
                ? 'bg-emerald-400'
                : agent.status === 'busy'
                ? 'bg-amber-400'
                : agent.status === 'error'
                ? 'bg-red-400'
                : 'bg-slate-500';

            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative p-5 rounded-xl bg-surface border border-border hover:border-accent/20 transition-all duration-300"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: `${config.color}20`, color: config.color }}
                      >
                        {agent.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{agent.name}</div>
                        <div className="text-xs text-muted">{config.label}</div>
                      </div>
                    </div>
                    <div className={cn('w-2 h-2 rounded-full', statusColor)} />
                  </div>

                  {/* Metrics */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">Outputs delivered</span>
                      <span className="text-foreground font-mono">
                        {agent.tasksCompleted.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">Active work items</span>
                      <span className="text-foreground font-mono">{agent.tasksInQueue}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">Available since</span>
                      <span className="text-foreground font-mono">{formatUptime(agent.uptime)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">Accuracy</span>
                      <span className="text-foreground font-mono">
                        {(agent.metrics.successRate * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Agent Description */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-xs text-foreground/70 italic">{config.description}</div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 h-0.5 rounded-full bg-surface-lighter overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: config.color }}
                      initial={{ width: '0%' }}
                      whileInView={{ width: agent.status === 'busy' ? '65%' : '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* System Health Footer */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Active
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Busy
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            Idle
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            Error
          </div>
        </div>
      </div>
    </section>
  );
}
