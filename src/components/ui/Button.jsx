 /**
 * Shared button primitive.
 *
 * This component deliberately passes every prop through to the native button
 * so existing click handlers, inline styles, accessibility attributes, and
 * disabled states continue to behave exactly as before.
 */
export default function Button({ children, ...buttonProps }) {
  return <button {...buttonProps}>{children}</button>;
}
