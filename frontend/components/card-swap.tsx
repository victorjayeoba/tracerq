"use client"

import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from "react"
import gsap from "gsap"

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { customClass?: string }>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    />
  ),
)
Card.displayName = "Card"

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
})

const placeNow = (el: HTMLElement, slot: any, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  })

interface CardSwapProps {
  width?: number
  height?: number
  cardDistance?: number
  verticalDistance?: number
  delay?: number
  pauseOnHover?: boolean
  onCardClick?: (index: number) => void
  skewAmount?: number
  easing?: "elastic" | "power"
  children: React.ReactNode
}

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 3000, // Faster swap (reduced from 5000)
  pauseOnHover = true, // Default to pause on hover
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 1.5, // Faster animation (reduced from 2)
          durMove: 1.5, // Faster animation
          durReturn: 1.5, // Faster animation
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.6, // Faster animation (reduced from 0.8)
          durMove: 0.6, // Faster animation
          durReturn: 0.6, // Faster animation
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        }

  const childArr = useMemo(() => Children.toArray(children), [children])
  const refs = useMemo(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length])

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i))

  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const intervalRef = useRef<number>()
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const total = refs.length
    refs.forEach((r, i) => {
      placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount)
      
      // Add initial animations to make cards more lively
      gsap.from(r.current!, {
        opacity: 0,
        scale: 0.9,
        rotation: i % 2 === 0 ? 5 : -5,
        duration: 0.8,
        delay: i * 0.2,
        ease: "back.out(1.7)",
      })
    })

    const swap = () => {
      if (order.current.length < 2) return

      const [front, ...rest] = order.current
      const elFront = refs[front].current!
      const tl = gsap.timeline()
      tlRef.current = tl

      // Add a little bounce effect
      tl.to(elFront, {
        scale: 1.05,
        duration: 0.3,
        ease: "power1.out",
      })
      
      tl.to(elFront, {
        scale: 1,
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
        rotation: Math.random() > 0.5 ? 5 : -5, // Random rotation for more dynamic feel
      }, "-=0.1")

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`)
      rest.forEach((idx, i) => {
        const el = refs[idx].current!
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length)
        tl.set(el, { zIndex: slot.zIndex }, "promote")
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
            scale: 1 + (0.05 * (refs.length - i - 1)), // Slightly scale up cards as they move forward
          },
          `promote+=${i * 0.15}`,
        )
      })

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length)
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`)
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex })
        },
        undefined,
        "return",
      )
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return")
      tl.to(
        elFront,
        {
          y: backSlot.y,
          duration: config.durReturn,
          ease: config.ease,
          rotation: 0, // Reset rotation
          scale: 1, // Reset scale
        },
        "return",
      )

      tl.call(() => {
        order.current = [...rest, front]
      })
    }

    swap()
    intervalRef.current = window.setInterval(swap, delay)

    if (pauseOnHover) {
      const node = container.current!
      const pause = () => {
        tlRef.current?.pause()
        clearInterval(intervalRef.current)
        
        // Add hover effect to all cards
        refs.forEach((ref, i) => {
          const currentOrder = order.current.indexOf(i)
          if (currentOrder >= 0) {
            gsap.to(ref.current, {
              scale: 1.05,
              duration: 0.3,
              ease: "power1.out",
            })
          }
        })
      }
      const resume = () => {
        // Reset hover effect
        refs.forEach((ref) => {
          gsap.to(ref.current, {
            scale: 1,
            duration: 0.3,
            ease: "power1.in",
          })
        })
        
        tlRef.current?.play()
        intervalRef.current = window.setInterval(swap, delay)
      }
      node.addEventListener("mouseenter", pause)
      node.addEventListener("mouseleave", resume)
      return () => {
        node.removeEventListener("mouseenter", pause)
        node.removeEventListener("mouseleave", resume)
        clearInterval(intervalRef.current)
      }
    }
    return () => clearInterval(intervalRef.current)
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, config, refs])

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e: React.MouseEvent) => {
            child.props.onClick?.(e)
            onCardClick?.(i)
          },
          className: `${child.props.className || ''} text-lg font-medium`, // Make text bigger and bolder
        } as any)
      : child,
  )

  return (
    <div
      ref={container}
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[0%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[5%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[5%] max-[480px]:scale-[0.55]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  )
}

export default CardSwap
