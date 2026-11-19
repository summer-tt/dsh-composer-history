/**
 * Contenteditable composer DOM face: the identity, text, and caret helpers
 * the wiring (index.ts) and the interception core (interceptor.ts) share.
 *
 * Since harness commit b519cb87b0 (an ancestor of the published
 * 0.1.2-alpha.5 / 0.1.2-rc.1 lines) the web composer is a Lexical
 * contenteditable div — `div[data-composer-input]` inside the
 * `[data-input-scroll]` scrollport — instead of a `<textarea>`. The legacy
 * textarea composer (inside `[data-input-scroll]` on harness lines up to
 * 0.1.1-rc.2) stays supported through the same helpers, while textareas
 * outside the scrollport are negative cases that pass through untouched.
 *
 * Text reads prefer `innerText` (rendered text: `<br>` line breaks count as
 * '\n') and fall back to a deterministic node walk where innerText is
 * unavailable (jsdom). Caret math walks text nodes and `<br>` elements in
 * document order so offsets line up with the text face; the same walk
 * writes carets back, so both faces round-trip in either environment.
 */
/** The composer surface this plugin matches: a contenteditable div (or legacy textarea). */
export type ComposerElement = HTMLElement;
/**
 * The composer behind an event target, or undefined when the target is not
 * a composer. Matches the contenteditable surface anchored on
 * `[data-composer-input]` inside `[data-input-scroll]` (harness
 * 0.1.2-alpha.5 / 0.1.2-rc.1 and later), plus the legacy textarea composer
 * inside `[data-input-scroll]` (harness up to 0.1.1-rc.2). Every other
 * target — plain textareas, inert `[data-composer-input]` surfaces
 * (contenteditable="false", the no-session workspace-trigger state),
 * contenteditable elements without the anchor, and targets without the
 * scrollport ancestor — passes through.
 * @param target - the keyboard/input event target.
 * @returns the composer element, or undefined.
 */
export declare function composerOf(target: EventTarget | null): ComposerElement | undefined;
/**
 * The draft text of a composer surface.
 * @param composer - the composer element.
 * @returns the current text (the textarea value on the legacy face; the
 *   rendered contenteditable text otherwise).
 */
export declare function composerText(composer: ComposerElement): string;
/**
 * The collapsed caret offset into the composer text, or undefined when no
 * collapsed caret sits inside the composer (no selection, a non-collapsed
 * selection, or a caret owned by another element — all pass-through cases).
 * @param composer - the composer element.
 * @returns the character offset, or undefined.
 */
export declare function composerCaret(composer: ComposerElement): number | undefined;
/**
 * Place a collapsed caret at a character offset into the composer text.
 * Offsets clamp to the text bounds; the walk mirrors {@link composerCaret},
 * so a written caret reads back as the same offset.
 * @param composer - the composer element.
 * @param offset - the character offset (clamped).
 */
export declare function setComposerCaret(composer: ComposerElement, offset: number): void;
//# sourceMappingURL=composer-dom.d.ts.map