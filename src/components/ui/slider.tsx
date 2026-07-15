"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

interface DualRangeSliderProps
  extends Omit<
    React.ComponentProps<typeof SliderPrimitive.Root>,
    "value" | "onValueChange" | "defaultValue"
  > {
  value: number[]
  onValueChange: (value: number[]) => void
  label?: boolean
  labelContentPos?: "top" | "bottom"
  formatLabel?: (value: number) => string
}

function DualRangeSlider({
  className,
  value,
  onValueChange,
  label = false,
  labelContentPos = "top",
  formatLabel,
  min = 0,
  max = 100,
  ...props
}: DualRangeSliderProps) {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : [min, max]),
    [value, min, max]
  )

  const getPercent = React.useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max]
  )

  return (
    <div className="relative w-full">
      {label && (
        <div
          className={cn(
            "pointer-events-none relative mb-3 h-6 w-full",
            labelContentPos === "bottom" && "order-last mt-3 mb-0"
          )}
        >
          {_values.map((val, index) => {
            const pct = getPercent(val)
            const display = formatLabel ? formatLabel(val) : `$${val.toLocaleString()}`
            return (
              <span
                key={index}
                className={cn(
                  "absolute -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-1.5 py-0.5 text-[11px] font-semibold text-primary-foreground shadow-md",
                  "before:absolute before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent",
                  labelContentPos === "top"
                    ? "top-0 before:-bottom-1 before:border-t-primary before:border-x-transparent"
                    : "bottom-0 before:-top-1 before:border-b-primary before:border-x-transparent"
                )}
                style={{ left: `${pct}%` }}
              >
                {display}
              </span>
            )
          })}
        </div>
      )}

      <SliderPrimitive.Root
        data-slot="dual-range-slider"
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        className={cn(
          "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="dual-range-track"
          className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted"
        >
          <SliderPrimitive.Range
            data-slot="dual-range-fill"
            className="absolute h-full rounded-full bg-primary"
          />
        </SliderPrimitive.Track>
        {_values.map((_, index) => (
          <SliderPrimitive.Thumb
            data-slot="dual-range-thumb"
            key={index}
            className="block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
    </div>
  )
}

export { Slider, DualRangeSlider }
