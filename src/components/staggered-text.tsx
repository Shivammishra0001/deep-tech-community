"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cx } from "@/components/ui";

export type SegmentBy = "Characters" | "Words" | "Lines" | "characters" | "words" | "lines";
export type StaggerDirection = "Forward" | "Backward" | "Center" | "Random" | "forward" | "backward" | "center" | "random";
export type SlideDirection = "Top" | "Bottom" | "Left" | "Right" | "None" | "top" | "bottom" | "left" | "right" | "none";
export type EasingType =
  | "Anticipate"
  | "EaseOut"
  | "EaseInOut"
  | "Spring"
  | "Linear"
  | "anticipate"
  | "easeOut"
  | "easeInOut"
  | "spring"
  | "linear"
  | [number, number, number, number];

export interface StaggeredTextProps {
  text?: string;
  children?: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  segmentBy?: SegmentBy;
  staggerDirection?: StaggerDirection;
  direction?: SlideDirection;
  easing?: EasingType;
  duration?: number | string;
  staggerDelay?: number | string;
  delay?: number | string;
  initialDelay?: number | string;
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number | "some" | "all";
  };
  className?: string;
  wordClassName?: string;
  segmentClassName?: string;
  trigger?: "inView" | "hover" | "always";
}

const parseDuration = (val?: number | string, fallback = 0.5): number => {
  if (val === undefined || val === null) return fallback;
  if (typeof val === "number") return val;
  const trimmed = val.trim();
  if (trimmed.endsWith("ms")) return parseFloat(trimmed) / 1000;
  if (trimmed.endsWith("s")) return parseFloat(trimmed);
  const num = parseFloat(trimmed);
  return isNaN(num) ? fallback : num;
};

const getEasing = (easing?: EasingType): any => {
  if (Array.isArray(easing)) return easing;
  const key = typeof easing === "string" ? easing.toLowerCase() : "easeout";
  switch (key) {
    case "anticipate":
      return [0.36, 0, 0.66, -0.56];
    case "easeinout":
      return [0.65, 0, 0.35, 1];
    case "spring":
      return { type: "spring", stiffness: 300, damping: 24 };
    case "linear":
      return "linear";
    case "easeout":
    default:
      return [0.22, 1, 0.36, 1];
  }
};

export function StaggeredText({
  text,
  children,
  as: Component = "span",
  segmentBy = "Words",
  staggerDirection = "Forward",
  direction = "Top",
  easing = "EaseOut",
  duration = "0.6s",
  staggerDelay = "0.035s",
  delay,
  initialDelay = "0s",
  viewport = { once: true, margin: "-40px" },
  className = "",
  wordClassName = "",
  segmentClassName = "",
  trigger = "inView",
}: StaggeredTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const content = text ?? (typeof children === "string" ? children : "");

  const parsedDuration = parseDuration(duration, 0.6);
  const parsedStaggerDelay = parseDuration(delay ?? staggerDelay, 0.035);
  const parsedInitialDelay = parseDuration(initialDelay, 0);
  const resolvedEase = getEasing(easing);

  const segmentType = segmentBy.toLowerCase();
  const dir = direction.toLowerCase();
  const staggerDir = staggerDirection.toLowerCase();

  const getInitialOffset = () => {
    if (shouldReduceMotion || dir === "none") return { x: 0, y: 0 };
    switch (dir) {
      case "top":
        return { x: 0, y: "110%" };
      case "bottom":
        return { x: 0, y: "-110%" };
      case "left":
        return { x: "100%", y: 0 };
      case "right":
        return { x: "-100%", y: 0 };
      default:
        return { x: 0, y: "100%" };
    }
  };

  const initialOffset = getInitialOffset();

  const tokens = useMemo(() => {
    if (!content) return [];

    if (segmentType === "lines") {
      const lines = content.split("\n");
      return lines.map((line, lIdx) => ({
        type: "line" as const,
        value: line,
        isLast: lIdx === lines.length - 1,
        segments: [line],
      }));
    }

    const words = content.split(" ");
    return words.map((word, wIdx) => {
      const chars = word.split("");
      return {
        type: "word" as const,
        value: word,
        isLast: wIdx === words.length - 1,
        segments: segmentType === "characters" ? chars : [word],
      };
    });
  }, [content, segmentType]);

  const totalSegments = useMemo(() => {
    return tokens.reduce((acc, token) => acc + token.segments.length, 0);
  }, [tokens]);

  const getStaggerIndex = (flatIdx: number, total: number) => {
    switch (staggerDir) {
      case "backward":
        return total - 1 - flatIdx;
      case "center": {
        const center = (total - 1) / 2;
        return Math.abs(flatIdx - center);
      }
      case "random": {
        const pseudo = (Math.sin(flatIdx * 9999) + 1) / 2;
        return Math.floor(pseudo * total);
      }
      case "forward":
      default:
        return flatIdx;
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : parsedStaggerDelay,
        delayChildren: parsedInitialDelay,
      },
    },
  };

  const MotionComponent = (motion as any)[Component] || motion.span;

  let globalSegmentCounter = 0;

  return (
    <MotionComponent
      initial="hidden"
      whileInView={trigger === "inView" ? "visible" : undefined}
      animate={trigger === "always" ? "visible" : undefined}
      whileHover={trigger === "hover" ? "visible" : undefined}
      viewport={viewport}
      variants={containerVariants}
      className={cx("inline-block", className)}
    >
      {tokens.map((token, tIdx) => {
        if (token.type === "line") {
          const currentIdx = globalSegmentCounter++;
          const staggerOrder = getStaggerIndex(currentIdx, totalSegments);
          const segmentDelay = parsedInitialDelay + staggerOrder * parsedStaggerDelay;

          return (
            <span key={tIdx} className={cx("block overflow-hidden", wordClassName)}>
              <motion.span
                variants={{
                  hidden: {
                    opacity: 0,
                    x: initialOffset.x,
                    y: initialOffset.y,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                      duration: shouldReduceMotion ? 0.2 : parsedDuration,
                      delay: segmentDelay,
                      ease: resolvedEase,
                    },
                  },
                }}
                className={cx("inline-block", segmentClassName)}
              >
                {token.value}
              </motion.span>
            </span>
          );
        }

        return (
          <span
            key={tIdx}
            className={cx("inline-block overflow-hidden whitespace-nowrap align-baseline", wordClassName)}
          >
            {token.segments.map((seg, sIdx) => {
              const currentIdx = globalSegmentCounter++;
              const staggerOrder = getStaggerIndex(currentIdx, totalSegments);
              const segmentDelay = parsedInitialDelay + staggerOrder * parsedStaggerDelay;

              return (
                <motion.span
                  key={sIdx}
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: initialOffset.x,
                      y: initialOffset.y,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      transition: {
                        duration: shouldReduceMotion ? 0.2 : parsedDuration,
                        delay: segmentDelay,
                        ease: resolvedEase,
                      },
                    },
                  }}
                  className={cx("inline-block", segmentClassName)}
                >
                  {seg}
                </motion.span>
              );
            })}
            {!token.isLast && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </MotionComponent>
  );
}

export default StaggeredText;
