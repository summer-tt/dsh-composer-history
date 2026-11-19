/**
 * Plugin Config: the Schemastery schema every tunable lives in, in the two
 * faces the `0.1.7` settings contract needs.
 *
 * `Config` is the Loader- and settings-form-facing schema: every field is
 * declared `.volatile()`, so the host reads it as a stable live reference,
 * projects it into the entry's settings form, and hot-applies an accepted
 * edit without remounting the plugin. This is also the schema the Loader
 * validates any cordis.yml `config:` block against at load time — invalid
 * values fail the entry loudly before anything reaches a browser.
 *
 * `PlainConfig` is the same field set as ordinary values, and it is what the
 * browser half resolves a wire section (or its own boot config) through: the
 * `configForms` snapshot hands over plain JSON, and re-running the volatile
 * schema on it would wrap every field in a live reference again.
 *
 * Both faces are built from one `FIELDS` definition, so a new tunable cannot
 * reach one without reaching the other. Key-spec GRAMMAR (chord syntax) is
 * validated at parse time by keys.ts, not by the schema — a malformed chord
 * fails the browser fiber loudly at load.
 */
import z from '@deepseek-ai/schemastery';
import type { Volatile } from '@deepseek-ai/cordis';
import type { RecallOptions } from './recall.js';
/** Config face; structurally the pure machine's {@link RecallOptions} plus the wiring tunables. */
export interface ComposerHistoryConfig extends RecallOptions {
    /** `KeyboardEvent.key` that recalls upward; '' disables. */
    readonly upKey: string;
    /** `KeyboardEvent.key` that walks newer / restores; '' disables. */
    readonly downKey: string;
    /** `KeyboardEvent.key` that escapes browsing; '' disables. */
    readonly escapeKey: string;
    /** Maximum recalled entries (newest kept); 0 means unlimited. */
    readonly maxHistory: number;
    /** Conversation node kinds admitted into the history ('user', optionally 'steering'). */
    readonly includeKinds: string[];
    /** 'session': current session only; 'workspace': other listed sessions join before it. */
    readonly historyScope: 'session' | 'workspace';
    /** Persist sent messages across page reloads and sessions (browser-local). */
    readonly persistHistory: boolean;
    /** Maximum persisted entries; 0 means unlimited. */
    readonly maxPersisted: number;
    /** Enable the reverse-search overlay. */
    readonly enableSearch: boolean;
    /** Chord specs opening the search overlay, e.g. 'Ctrl+R'. */
    readonly searchKeys: string[];
    /** Whether search matching distinguishes letter case. */
    readonly searchCaseSensitive: boolean;
    /** Admit `[compacted]` checkpoint summaries into recall and search. */
    readonly includeCompactionSummaries: boolean;
    /** Show a transient notice when a compaction checkpoint lands. */
    readonly showCompactionNotice: boolean;
    /** Slash command the notice's "Compact now" action fills; '' hides the action. */
    readonly compactCommandText: string;
    /** Enable the cross-session snippet library (`/save`, `/load`, overlay picking). */
    readonly enableSnippets: boolean;
    /** Maximum stored snippets; 0 means unlimited. */
    readonly maxSnippets: number;
    /** Enable the prompt-template library (variables fill at insertion). */
    readonly enableTemplates: boolean;
    /** Enable the reuse-insight hint (local usage statistics). */
    readonly enableInsights: boolean;
    /** Minimum uses before a reuse hint shows. */
    readonly insightMinUses: number;
    /** Badge compacted summaries distinctly in the search overlay. */
    readonly enableCompactionHighlight: boolean;
}
/**
 * Live Config face: what the Loader hands the host half's `apply`, and the
 * field set the settings form projects, edits and hot-applies. Every tunable
 * is a stable reference (`.get()` reads it) rather than a plain value.
 */
export type ComposerHistoryLiveConfig = {
    readonly [K in keyof ComposerHistoryConfig]: Volatile<ComposerHistoryConfig[K]>;
};
/**
 * Plain projection: fills the defaults and rejects invalid values. The
 * browser half resolves the settings-form section (and its own boot config)
 * through this, and it is the shape every consumer of the options reads.
 */
export declare const PlainConfig: z<ComposerHistoryConfig>;
/**
 * Live projection: the Loader validates cordis.yml `config:` blocks against
 * this schema, and the host's settings form projects exactly these fields —
 * the entry's own id is the form namespace on the `0.1.7` contract.
 *
 * The dict is built by calling `.volatile()` on each field, so the runtime
 * shape is exact while the static one (a `Record<string, …>` from
 * `Object.fromEntries`) needs the boundary cast to the declared live face.
 */
export declare const Config: z<ComposerHistoryLiveConfig>;
/**
 * Resolve a config input through the PLAIN schema: partial input gets the
 * defaults, invalid values throw at load time. The boundary cast is
 * deliberate — the schema's declared source type is the fully-populated
 * object, while runtime accepts partial input and fills the rest.
 * @param input - raw config (cordis.yml block, settings-form section, or absent in the browser).
 * @returns the validated, fully-defaulted options.
 */
export declare function resolveConfig(input: unknown): ComposerHistoryConfig;
//# sourceMappingURL=config.d.ts.map