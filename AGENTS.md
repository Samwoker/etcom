# AGENT BEHAVIORAL CONTRACT: ETCOM ARCHITECTURE & RULES

Every agent session working in this repository MUST strictly abide by the rules defined in [ARCHITECTURE.md](file:///home/seraph/Desktop/side/etcom/ARCHITECTURE.md).

## Critical Non-Negotiables for Every Turn:
1. **Never edit files in `src/components/ui/`**: Always wrap or compose shadcn primitives in `src/components/shared/` or feature components.
2. **Use shadcn/ui for every primitive**: Never hand-build primitives (`Button`, `Card`, `Input`, `Badge`, `Tabs`, `Sheet`, `Dialog`, etc.).
3. **Pages are thin composition shells**: Max ~50 lines, no business logic, no mock data literals, no styling beyond layout classes.
4. **No hardcoded colors, fonts, or radii**: Always use semantic Tailwind theme tokens (`bg-primary`, `text-muted-foreground`, etc.). No inline `style={{}}`.
5. **Strict TypeScript (No `any`)**: All domain types live in `src/types/`.
6. **No real network calls**: All data must flow through `src/services/` with async simulated delays (300-600ms).
7. **Three mandatory UI states on every screen**: Loading (`Skeleton`), Empty (`EmptyState`), Error/Edge states.
8. **One component per file**: Target under 120 lines. Split when larger.
9. **Mobile-first responsive web app**: 390px base mobile viewport, responsively adapting to medium (tablet, 768px) and desktop viewports with fluid container scaling (up to max-w-2xl/3xl) and responsive layout grids (no artificial phone-mock bezels).
10. **Icons only via `lucide-react`**: Zero emojis in the user interface.
11. **Tripartite Verification**: Never use a single generic "Verified" badge. Identity, skills, and work history must be rendered separately.
12. **Routes via `ROUTES`**: Always import paths from `@/app/routes` (`ROUTES`). Never hardcode route string literals in components.
13. **Strict Layering**: `pages -> features -> services -> data` (and `features -> store`). `components/shared` and `components/ui` NEVER import from features/pages/services/store.
14. **Copywriting bans**: Never use the word "escrow" or promise automatic refunds. Unverified items are "Not verified", claimed experience is "Self-reported".
15. **Scope discipline**: Implement only the requested page or feature in the prompt. Do not add unasked-for features or unapproved dependencies.
