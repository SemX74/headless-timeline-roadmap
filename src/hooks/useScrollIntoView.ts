import { useReducedMotion, useWindowEvent } from '@mantine/hooks'
import { useCallback, useRef, useEffect, RefObject } from 'react'
interface ScrollIntoViewAnimation {
  /** target element alignment relatively to parent based on current axis */
  alignment?: 'start' | 'end' | 'center'
  targetRef: RefObject<HTMLDivElement>
  scrollableRef: RefObject<HTMLDivElement>
}

interface ScrollIntoViewParams {
  onScrollFinish?: () => void
  duration?: number
  axis?: 'x' | 'y'
  easing?: (t: number) => number
  offset?: number
  cancelable?: boolean
  isList?: boolean
}

export function useCustomScrollIntoView({
  duration = 1250,
  axis = 'y',
  onScrollFinish,
  easing = easeInOutQuad,
  offset = 0,
  cancelable = true,
  isList = false,
}: ScrollIntoViewParams = {}) {
  const frameID = useRef(0)
  const startTime = useRef(0)
  const shouldStop = useRef(false)
  const scrolling = useRef(false)

  const reducedMotion = useReducedMotion()

  const cancel = (): void => {
    if (frameID.current) {
      cancelAnimationFrame(frameID.current)
    }
  }

  const scrollIntoView = useCallback(
    ({
      alignment = 'start',
      targetRef,
      scrollableRef,
    }: ScrollIntoViewAnimation) => {
      shouldStop.current = false

      if (frameID.current) {
        cancel()
      }

      const start = getScrollStart({ parent: scrollableRef.current, axis }) ?? 0

      const change =
        getRelativePosition({
          parent: scrollableRef.current,
          target: targetRef.current,
          axis,
          alignment,
          offset,
          isList,
        }) - (scrollableRef.current ? 0 : start)

      function animateScroll() {
        if (startTime.current === 0) {
          scrolling.current = true
          startTime.current = performance.now()
        }

        const now = performance.now()
        const elapsed = now - startTime.current

        const t = reducedMotion || duration === 0 ? 1 : elapsed / duration

        const distance = start + change * easing(t)

        setScrollParam({
          parent: scrollableRef.current,
          axis,
          distance,
        })

        if (!shouldStop.current && t < 1) {
          frameID.current = requestAnimationFrame(animateScroll)
        } else {
          typeof onScrollFinish === 'function' && onScrollFinish()
          scrolling.current = false
          startTime.current = 0
          frameID.current = 0
          cancel()
        }
      }
      animateScroll()
    },
    [axis, duration, easing, isList, offset, onScrollFinish, reducedMotion]
  )

  const handleStop = () => {
    if (cancelable) {
      shouldStop.current = true
    }
  }

  useWindowEvent('wheel', handleStop, {
    passive: true,
  })

  useWindowEvent('touchmove', handleStop, {
    passive: true,
  })

  useEffect(() => cancel, [])

  return {
    scrollIntoView,
    cancel,
    scrolling,
  }
}
const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

const getRelativePosition = ({
  axis,
  target,
  parent,
  alignment,
  offset,
  isList,
}: any): number => {
  if (!target || (!parent && typeof document === 'undefined')) {
    return 0
  }
  const isCustomParent = !!parent
  const parentElement = parent || document.body
  const parentPosition = parentElement.getBoundingClientRect()
  const targetPosition = target.getBoundingClientRect()

  const getDiff = (property: 'top' | 'left'): number =>
    targetPosition[property] - parentPosition[property]

  if (axis === 'y') {
    const diff = getDiff('top')

    if (diff === 0) return 0
    if (alignment === 'start') {
      const distance = diff - offset
      const shouldScroll =
        distance <= targetPosition.height * (isList ? 0 : 1) || !isList

      return shouldScroll ? distance : 0
    }
    const parentHeight = isCustomParent
      ? parentPosition.height
      : window.innerHeight

    if (alignment === 'end') {
      const distance = diff + offset - parentHeight + targetPosition.height
      const shouldScroll =
        distance >= -targetPosition.height * (isList ? 0 : 1) || !isList

      return shouldScroll ? distance : 0
    }

    if (alignment === 'center') {
      return diff - parentHeight / 2 + targetPosition.height / 2
    }
    return 0
  }
  if (axis === 'x') {
    const diff = getDiff('left')
    if (diff === 0) return 0
    if (alignment === 'start') {
      const distance = diff - offset
      const shouldScroll = distance <= targetPosition.width || !isList

      return shouldScroll ? distance : 0
    }
    const parentWidth = isCustomParent
      ? parentPosition.width
      : window.innerWidth

    if (alignment === 'end') {
      const distance = diff + offset - parentWidth + targetPosition.width
      const shouldScroll = distance >= -targetPosition.width || !isList

      return shouldScroll ? distance : 0
    }
    if (alignment === 'center') {
      return diff - parentWidth / 2 + targetPosition.width / 2
    }
    return 0
  }
  return 0
}
const getScrollStart = ({ axis, parent }: any) => {
  if (!parent && typeof document === 'undefined') {
    return 0
  }
  const method = axis === 'y' ? 'scrollTop' : 'scrollLeft'
  if (parent) {
    return parent[method]
  }
  const { body, documentElement } = document
  return body[method] + documentElement[method]
}
const setScrollParam = ({ axis, parent, distance }: any) => {
  if (!parent && typeof document === 'undefined') {
    return
  }
  const method = axis === 'y' ? 'scrollTop' : 'scrollLeft'
  if (parent) {
    parent[method] = distance
  } else {
    const { body, documentElement } = document
    body[method] = distance
    documentElement[method] = distance
  }
}
