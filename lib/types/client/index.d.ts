/**
 * dsh-composer-history, browser half: window-capture keyboard interception
 * that layers terminal-style draft recall over the composer. History comes
 * from the current Session's Chat target (the ui-conversation assembly's
 * compatibility projection, see ./session-nodes.ts), the input machine
 * facade provides draft/phase and the single setDraft write path, and the
 * sessions service provides list/scope; the slash-menu gate reads the
 * inputTriggers service, asserted to its exported class type — the sanctioned
 * cross-package pattern for service instances — and falls back to the
 * trigger-token heuristic when the service is absent. Keydown listens on
 * capture (the interception must beat the machine's own handlers); input
 * listens on bubble, because the
 * Lexical contenteditable DOM is written by the editor library during the
 * target phase and only carries the edit from the bubble phase on.
 *
 * Effective options resolve from three layers: the boot config (none today),
 * the host entry's live settings form through `ctx.configForms` (carrying the
 * composition base — cordis.yml — plus the profile's override layer), and the
 * schema defaults. The form arrives asynchronously; the wiring reinstalls on
 * every committed change.
 * Sent messages are appended to a bounded browser-local history store so
 * recall survives reloads and reaches across sessions. Compaction
 * checkpoints (the harness's sliding-context summaries) join recall and
 * search as prefixed entries, and a transient notice announces each
 * checkpoint that lands while the page is open.
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import { type ComposerHistoryConfig } from './config.js';
export { Config, resolveConfig } from './config.js';
export type { ComposerHistoryConfig } from './config.js';
export type { RecallEffect, RecallOptions, RecallState } from './recall.js';
export { composerCaret, composerOf, composerText, setComposerCaret } from './composer-dom.js';
export type { ComposerElement } from './composer-dom.js';
/** Plugin name: matches the package name, the graph row id, and the bundle id. */
export declare const name = "dsh-composer-history";
/** Services the interception reads; activation waits on them. */
export declare const inject: string[];
/**
 * Browser plugin body: resolve the effective options, wire the interception
 * host over the session/input/trigger services, keep the persisted history
 * store in sync with the current session's commits, and register the
 * window-capture listeners as one effect. The host entry's settings form is
 * observed; every committed option change tears the wiring down and reinstalls
 * it.
 * @param ctx - client root context.
 * @param config - plain partial config or host volatile references; live values
 *   arrive through configForms, while references use schema defaults at boot.
 */
export declare function bootConfigOf(input: unknown): Partial<ComposerHistoryConfig>;
export declare function apply(ctx: ClientContext, config?: Partial<ComposerHistoryConfig>): void;
//# sourceMappingURL=index.d.ts.map