# Style guide

This is just a small file to remind myself how atrributes and props are ordered.

1. `this` from `svelte:element`
2. `bind:this`
3. `use` actions
4. id
5. class
6. element attributes
7. aria attributes
8. data attributes
9. event handlers
10. restProps

## Context naming conventions:

These are some naming conventions when it comes to the `main.svelte.ts` files found the the `src/lib/components`.

- Class context props are prefixed with a `$` to make it clear that it has a getter.
  - Example: `this.$value.val`
- Parent variables starts with an underscore (`_`).
  - Example: `this._root.variable`
- Derived statments start with a capital.
  - Example: `this.DerivedState`
- Events passed down through the context are private to that class.
  - Example: `this.#events.onClick?.(e)`
