# Design Audit Checklist

Use this checklist to review new screens or redesigns before shipping. It maps to the tokens and layout patterns already in this skeleton.

## 1) Goals + content
- [ ] The primary task for the screen is clear within 5 seconds.
- [ ] Real copy is used (not lorem ipsum).
- [ ] Each section has a clear purpose and supporting description.

## 2) Hierarchy + structure
- [ ] There is one primary action per screen/section.
- [ ] Secondary actions are visually quieter (ghost button, muted text).
- [ ] Sections are grouped into cards or panels with consistent spacing.

## 3) Typography
- [ ] Heading, body, and caption sizes follow the type scale.
- [ ] Text colors use tokens (primary/secondary/muted), not custom hex.
- [ ] Line lengths are readable (around 45–75 characters).

## 4) Color + contrast
- [ ] Interactive elements meet contrast requirements.
- [ ] Status colors are consistent (success, warning, danger, info).
- [ ] Surfaces and borders use tokens for light/dark separation.

## 5) Spacing + alignment
- [ ] Consistent spacing between elements (multiples of 4/8/12/16).
- [ ] Content aligns to a clear grid or column structure.
- [ ] No element touches the viewport edge without padding.

## 6) Responsive behavior
- [ ] Containers use `min()` and padding for fluid layouts.
- [ ] At 768px, grids collapse to one column and padding reduces.
- [ ] At 480px, dense rows allow horizontal scrolling.
- [ ] Content remains usable at in-between sizes (e.g., 600px).

## 7) Accessibility
- [ ] Headings are ordered logically (H1 → H2 → H3).
- [ ] Buttons and inputs have visible focus styles.
- [ ] Interactive elements have clear labels.

## 8) Final QA
- [ ] Empty/loading/error states are defined.
- [ ] Long content truncates or wraps gracefully.
- [ ] No layout shift on load (images sized, placeholders ready).
