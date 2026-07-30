/**
 * Shared card primitive.
 *
 * This component deliberately passes every prop through to a native div so
 * existing inline styles, class names, accessibility attributes, and event
 * handlers continue to behave exactly as before.
 */
export default function Card({ children, ...cardProps }) {
  return <div {...cardProps}>{children}</div>;
}
