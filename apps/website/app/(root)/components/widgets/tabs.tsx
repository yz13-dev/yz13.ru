"use client"

import { Button } from "@yz13/ui/components/button"
import { AnimatePresence, motion } from "motion/react"
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { createStore, useStore } from "zustand"

export type WidgetStand = {
  value: string
  title: string
  description: string
  content: React.ReactNode
  icon?: React.ReactNode
}

type State = {
  selected: string | null
  widgets: WidgetStand[]
}

type Actions = {
  setSelected: (value: string | null) => void
  setWidgets: (widgets: WidgetStand[]) => void
}

const initialStand: State = {
  selected: null,
  widgets: []
}

export const createStandStore = (initial: Partial<State> = {}) => {
  const state: State = {
    ...initialStand,
    ...initial
  }

  return createStore<State & Actions>((set) => ({
    ...state,
    setSelected: (value: string | null) => set({ selected: value }),
    setWidgets: (widgets: WidgetStand[]) => set({ widgets })
  }))
}

// Context for the tabs store
type TabsStore = ReturnType<typeof createStandStore>
const TabsContext = createContext<TabsStore | null>(null)

// Provider component
interface TabsProviderProps {
  children: ReactNode
  initial?: Partial<State>
}

export function TabsProvider({ children, initial }: TabsProviderProps) {
  const storeRef = useRef<TabsStore | undefined>(undefined)

  if (!storeRef.current) {
    storeRef.current = createStandStore(initial)
  }

  return (
    <TabsContext.Provider value={storeRef.current}>
      {children}
    </TabsContext.Provider>
  )
}

// Hook to use the tabs store
export function useTabsStore<T>(selector: (state: State & Actions) => T): T {
  const store = useContext(TabsContext)
  if (!store) {
    throw new Error("useTabsStore must be used within a TabsProvider")
  }
  return useStore(store, selector)
}

// Hook to get the entire store
export function useTabsStoreInstance() {
  const store = useContext(TabsContext)
  if (!store) {
    throw new Error("useTabsStoreInstance must be used within a TabsProvider")
  }
  return store
}

// Main Stand Component (similar to stand.tsx)
interface StandProps {
  widgets: WidgetStand[]
  title?: string
  description?: string
  defaultSelected?: string
  className?: string
  showDescription?: boolean
  buttonSize?: "sm" | "lg"
  layout?: "horizontal" | "vertical"
}

export function Stand({
  widgets,
  title = "Виджеты",
  description = "Последние добавленные виджеты.",
  defaultSelected,
  className = "",
  showDescription = true,
  buttonSize = "lg",
  layout = "horizontal"
}: StandProps) {
  const setSelected = useTabsStore((state) => state.setSelected)
  const selected = useTabsStore((state) => state.selected)
  const setWidgets = useTabsStore((state) => state.setWidgets)

  // Initialize widgets and default selection
  useEffect(() => {
    setWidgets(widgets)
    if (defaultSelected && !selected) {
      setSelected(defaultSelected)
    } else if (!selected && widgets.length > 0 && widgets[0]) {
      setSelected(widgets[0].value)
    }
  }, [widgets, defaultSelected, selected, setSelected, setWidgets])

  const content = widgets.find(widget => widget.value === selected)?.content
  const selectedWidget = widgets.find(widget => widget.value === selected)

  if (!widgets.length) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Нет виджетов</span>
      </div>
    )
  }

  return (
    <section className={`w-full space-y-10 mx-auto ${className}`}>
      <div className="w-full space-y-3">
        {(title || description) && (
          <div className="w-full">
            {title && (
              <h3 className="text-2xl font-medium">
                {title}
              </h3>
            )}
            {description && showDescription && (
              <p className="text-base text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        <div className={`w-full gap-2 flex ${layout === 'horizontal' ? 'flex-row overflow-x-auto' : 'flex-col'}`}>
          {widgets.map(widget => {
            const isSelected = selected === widget.value
            return (
              <Button
                key={widget.value}
                size={buttonSize}
                variant={isSelected ? "default" : "secondary"}
                onClick={() => setSelected(widget.value)}
              >
                {widget.icon && <span className="mr-2">{widget.icon}</span>}
                {widget.title}
              </Button>
            )
          })}
        </div>

      </div>

      {content && (
        <AnimatePresence>
          <motion.div
            layoutId="tabs-content"
            className="min-h-[250px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              type: "spring",
              duration: 0.5
            }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  )
}

// Services Stand Component (similar to services-stand.tsx)
interface ServiceItem {
  id: string
  type: string
  name: string
  description?: string
}

interface ServicesStandProps {
  services: ServiceItem[]
  title?: string
  description?: string
  className?: string
  icons?: Record<string, React.ReactNode>
  defaultIcon?: React.ReactNode
}

export function ServicesStand({
  services,
  title,
  description,
  className = "",
  icons = {},
  defaultIcon
}: ServicesStandProps) {
  const [selected, setSelected] = useState<string | null>(services[0]?.type ?? null)
  const selectedService = services.find((service) => service.type === selected)

  if (!services.length) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Нет сервисов</span>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {(title || description) && (
        <div className="w-full">
          {title && (
            <h3 className="text-2xl font-medium">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-base text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="w-full h-fit min-h-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              duration: 0.75
            }}
          >
            <span className="text-lg font-medium">
              {selectedService.description ?? "Нет описания"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full flex gap-2 flex-wrap items-start">
        {services.map((service) => {
          const type = service.type as keyof typeof icons
          const icon = type && icons[type] ? icons[type] : defaultIcon
          const isSelected = type === selected

          return (
            <Button
              key={service.id}
              value={type}
              variant={isSelected ? "default" : "secondary"}
              onClick={() => setSelected(type)}
              size="sm"
            >
              {icon && <span className="mr-2">{icon}</span>}
              {service.name ?? "Неизвестно"}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

// Tabs Root component
interface TabsRootProps {
  children: ReactNode
  defaultSelected?: string
  onSelectionChange?: (value: string) => void
}

export function TabsRoot({ children, defaultSelected, onSelectionChange }: TabsRootProps) {
  const setSelected = useTabsStore((state) => state.setSelected)
  const selected = useTabsStore((state) => state.selected)

  // Set default selected on mount
  useEffect(() => {
    if (defaultSelected && !selected) {
      setSelected(defaultSelected)
    }
  }, [defaultSelected, selected, setSelected])

  // Handle selection change
  const handleSelectionChange = (value: string) => {
    setSelected(value)
    onSelectionChange?.(value)
  }

  return (
    <div className="w-full">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            selected,
            onSelectionChange: handleSelectionChange
          } as any)
        }
        return child
      })}
    </div>
  )
}

// Tabs List component
interface TabsListProps {
  children: ReactNode
  className?: string
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return (
    <div className={`flex border-b border-border ${className}`}>
      {children}
    </div>
  )
}

// Tabs Trigger component
interface TabsTriggerProps {
  value: string
  children: ReactNode
  className?: string
  selected?: string | null
  onSelectionChange?: (value: string) => void
}

export function TabsTrigger({
  value,
  children,
  className = "",
  selected,
  onSelectionChange
}: TabsTriggerProps) {
  const isSelected = selected === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      onClick={() => onSelectionChange?.(value)}
      className={`
        px-3 py-2 text-sm font-medium transition-colors
        hover:text-foreground/80
        ${isSelected
          ? "border-b-2 border-primary text-foreground"
          : "text-muted-foreground"
        }
        ${className}
      `}
    >
      {children}
    </button>
  )
}

// Tabs Content component
interface TabsContentProps {
  value: string
  children: ReactNode
  className?: string
  selected?: string | null
}

export function TabsContent({
  value,
  children,
  className = "",
  selected
}: TabsContentProps) {
  const isSelected = selected === value

  if (!isSelected) return null

  return (
    <div
      role="tabpanel"
      className={`mt-2 ${className}`}
    >
      {children}
    </div>
  )
}

// Convenience components that automatically use the store
export function TabsTriggerAuto({ value, children, className = "" }: Omit<TabsTriggerProps, 'selected' | 'onSelectionChange'>) {
  const selected = useTabsStore((state) => state.selected)
  const setSelected = useTabsStore((state) => state.setSelected)

  return (
    <TabsTrigger
      value={value}
      selected={selected}
      onSelectionChange={setSelected}
      className={className}
    >
      {children}
    </TabsTrigger>
  )
}

export function TabsContentAuto({ value, children, className = "" }: Omit<TabsContentProps, 'selected'>) {
  const selected = useTabsStore((state) => state.selected)

  return (
    <TabsContent
      value={value}
      selected={selected}
      className={className}
    >
      {children}
    </TabsContent>
  )
}
