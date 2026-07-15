"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"
import { GripVertical } from "lucide-react"

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

/* ------------------------------------------------------------------ */
/*  DualRangeSlider — premium grid-track + grip-thumb variant         */
/* ------------------------------------------------------------------ */

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

const TRACK_HEIGHT = "h-2.5"

const GRID_TRACK =
  "bg-zinc-800 [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:5px_5px]"

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
    [value, min, max],
  )

  const getPercent = React.useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max],
  )

  return (
    <div className="relative w-full select-none">
      {/* ---- floating labels ---- */}
      {label && (
        <div
          className={cn(
            "pointer-events-none relative h-7 w-full",
            labelContentPos === "bottom"
              ? "order-last mt-3"
              : "mb-2",
          )}
        >
          {_values.map((val, index) => {
            const pct = getPercent(val)
            const display = formatLabel
              ? formatLabel(val)
              : `$${val.toLocaleString()}`
            return (
              <span
                key={index}
                className={cn(
                  "absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-0.5 text-[11px] font-semibold leading-relaxed text-white shadow-lg",
                  "before:absolute before:left-1/2 before:-translate-x-1/2 before:border-[5px] before:border-transparent",
                  labelContentPos === "top"
                    ? "top-0 before:top-full before:border-t-ink"
                    : "bottom-0 before:bottom-full before:border-b-ink",
                )}
                style={{ left: `${pct}%` }}
              >
                {display}
              </span>
            )
          })}
        </div>
      )}

      {/* ---- slider root ---- */}
      <SliderPrimitive.Root
        data-slot="dual-range-slider"
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        className={cn(
          "relative flex h-6 w-full touch-none items-center",
          className,
        )}
        {...props}
      >
        {/* ---- track (inactive = dark grid) ---- */}
        <SliderPrimitive.Track
          data-slot="dual-range-track"
          className={cn(
            TRACK_HEIGHT,
            "relative w-full grow overflow-hidden rounded-full",
            GRID_TRACK,
          )}
        >
          {/* ---- range (active = solid blue) ---- */}
          <SliderPrimitive.Range
            data-slot="dual-range-fill"
            className={cn(
              TRACK_HEIGHT,
              "absolute rounded-full bg-primary",
            )}
          />
        </SliderPrimitive.Track>

        {/* ---- thumbs (rectangular grip handles) ---- */}
        {_values.map((_, index) => (
          <SliderPrimitive.Thumb
            data-slot="dual-range-thumb"
            key={index}
            className={cn(
              "group relative z-20 flex h-7 w-8 shrink-0 items-center justify-center",
              "rounded-md border border-zinc-300 bg-white shadow-md",
              "transition-shadow duration-150",
              "hover:shadow-lg hover:ring-2 hover:ring-primary/30",
              "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
              "active:scale-95 active:cursor-grabbing",
              "cursor-grab",
              "disabled:pointer-events-none disabled:opacity-40",
            )}
          >
            <GripVertical className="h-3.5 w-3.5 text-zinc-400 transition-colors group-hover:text-primary group-focus-visible:text-primary" />
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    </div>
  )
}

export { Slider, DualRangeSlider }
