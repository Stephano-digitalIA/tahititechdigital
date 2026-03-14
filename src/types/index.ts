export interface ServiceCard {
  id: string
  icon: string
  colorVariant: 'violet' | 'blue' | 'cyan' | 'pink'
  title: string
  tag: string
  description: string
  features: string[]
}

export interface MetricCard {
  id: string
  icon: string
  target: number
  suffix: string
  label: string
}

export interface SolutionStat {
  value: string
  label: string
}

export interface SolutionPanel {
  id: string
  tabLabel: string
  title: string
  description: string
  stats: SolutionStat[]
  ctaText: string
  mockupHtml: string
}

export interface PillarCard {
  id: string
  icon: string
  title: string
  description: string
}

export interface WhyCard {
  id: string
  icon: string
  title: string
  description: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface ContactCard {
  id: string
  icon: string
  title: string
  lines: string[]
}
