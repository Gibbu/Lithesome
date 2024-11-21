---
title: 'Changelog'
description: 'The timeline of changes for Lithesome'
hidden: true
---

### v0.17.0

<small>22 November, 2024</small>

- Added [Tooltip](/docs/components/tooltip) component.
- Added FloatingUI `offset` middleware by default and exported a `offset` prop to the corresponding `Content` components.
- Removed base elemenet to Floating root components.
  > This means the `<Select />`, `<Hovercard />`, `<Combobox />`... components won't have a wrapper `div` element.

### v0.16.0

<small>13 November, 2024</small>

- Added [Collapsible](/docs/components/collapsible) component.

### v0.15.2

<small>12 November, 2024</small>

- Fixed `Accordion` component not updating value prop on update.
- Added value prop to `AccordionItem` to allow for easier default setting of accordion items.
- Fixed `AccordionContent` aria-controls using the wrong IDs.

### v0.15.1

<small>11 November, 2024</small>

- Fixed `Select` and `Combobox` content components not displaying.
- Fixed `Tabs` component not updating `value` prop on update.
- Removed redundant `state` attributes applied on `MenuContent` component.

### v0.15.0

<small>10 November, 2024</small>

- Added [Tags](/docs/components/tags) components.

### v0.14.1

<small>10 November, 2024</small>

- Brought back event props.
  > This will allow users to use the already claimed events used by Lithesome.

### v0.14.0

<small>9th September, 2024</small>

- Complete rewrite of internal code.

### v0.13.7

<small>20th June, 2024</small>

- Narrowed component props.  
  This was done to reduce the autocomplete list size.
  > All props are able to be passed down.
- Exported `Placement` type from `@floating-ui/dom`.

### v0.13.6

<small>9th June, 2024</small>

- Allowed for `RadioGroup` to not require a starting value.

### v0.13.5

<small>6th June, 2024</small>

- Added onChange event to Select

### v0.13.4

<small>6th June, 2024</small>

- Added onChange event to RadioGroup

### v0.13.3

<small>6th June, 2024</small>

- Removed redundant path alias.

### v0.13.2

<small>6th June, 2024</small>

- Fixed FloatingContent importing.

### v0.13.1

<small>6th June, 2024</small>

- Remapped internal paths.

### v0.13.0

<small>5th June, 2024</small>

- New [Slider](/docs/components/slider) component.

### v0.12.3

<small>28th May, 2024</small>

- Converted floating content to a component.

### v0.12.2

<small>27th May, 2024</small>

- Fixed floating `constrainViewport` prop

### v0.12.1

<small>27th May, 2024</small>

- Improved floating logic.

### v0.12.0

<small>22nd May, 2024</small>

- New [Toast](/docs/components/toast) component.

### v0.11.0

<small>3rd May, 2024</small>

- New [Switch](/docs/components/switch) component.

### v0.10.3

<small>2nd May, 2024</small>

- Internal arrow component cleanup

### v0.10.2

<small>30th April, 2024</small>

- Removed unused portal export

### v0.10.1

<small>30th April, 2024</small>

- Quick fix for modals.

### v0.10.0

<small>30th April, 2024</small>

- Exported commonly used actions such as: [usePortal](/docs/actions/usePortal), [useOutside](/docs/actions/useOutside), and [useTrap](/docs/actions/useTrap).

### v0.9.0

<small>28th April, 2024</small>

- New [portal](/docs/components/portal) component.

### v0.8.0

<small>28th April, 2024</small>

- Exported all component types.

### v0.7.4

<small>25th April, 2024</small>

- Cleanup of internal transitions.

### v0.7.3

<small>19th April, 2024</small>

- Exported `SelectArrow` component.

### v0.7.2

<small>17th April, 2024</small>

- Fixed anchor targeting arrow component.

### v0.7.1

<small>16th April, 2024</small>

- Small internal changes.

### v0.7.0

<small>13th April, 2024</small>

- New arrow components for [Combobox](/docs/components/combobox), [Hover Card](/docs/components/hovercard), [Menu](/docs/components/menu), [Popover](/docs/components/popover), and [Select](/docs/components/select)
