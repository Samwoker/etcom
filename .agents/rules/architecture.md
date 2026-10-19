# Etcom Architecture Rules Enforcement

Before writing or editing code for any prompt, you MUST review and adhere to the architectural guidelines, domain models, and non-negotiable rules defined in `ARCHITECTURE.md`.

## Summary Checklist:
- Base primitives: shadcn/ui only. Files in `src/components/ui/` are untouchable.
- Pages: Thin composition only (< 50 lines). No logic or direct service/data imports.
- Layering: `pages -> features -> services -> data` (with `features -> store`).
- No hardcoded styling: Use Tailwind semantic theme tokens (`bg-primary`, `text-muted-foreground`, etc.). No inline styles.
- Verification badges: Never use a single generic "Verified" badge. Identity, skills, and work history must be shown separately.
- Routes: All paths must be accessed through `ROUTES` from `@/app/routes`.
- State handling: Every screen must account for loading (`Skeleton`), empty (`EmptyState`), and error/edge states.
- Domain rules: No "escrow" terminology or refund promises. "Self-reported" for claimed experience, "Not verified" for unverified claims.
- Currency & format: Always use `formatETB()` and Ethiopian phone format `+251 9X XXX XXXX`.
- Mobile-first responsive web app: 390px base, adapting to medium (tablet) and desktop with fluid container scaling (up to max-w-2xl/3xl) and responsive grids.
