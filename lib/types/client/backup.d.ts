/**
 * Versioned JSON backup: one export document covering all four browser-local
 * namespaces (history, snippets, templates, insights). Export serializes the
 * whole state into a `{ schemaVersion, exportedAt, data }` envelope; import
 * parses, migrates, and merges it back — all over an injected storage face,
 * so the whole path is unit-testable without a browser and without a network.
 *
 * Conflict resolution is keep-newest-by-timestamp for the record namespaces
 * (snippets and templates by `updatedAt`, insights by `lastUsedAt`), while
 * history entries are plain strings and deduplicate by exact text (a
 * duplicate or blank entry is skipped, never overwritten). The import report
 * records added/updated/skipped per namespace so the UI can summarize what
 * actually changed. A document whose `schemaVersion` is newer than the one
 * this build understands is rejected loudly (fail-closed) — it is never
 * silently dropped or partially merged.
 */
import { type StorageLike } from './history-store.js';
import { type SnippetRecord } from './snippets.js';
import { type TemplateRecord } from './templates.js';
import { type UsageRecord } from './insights.js';
/** Current backup envelope version; the first released format. */
export declare const BACKUP_SCHEMA_VERSION = 1;
/** The four persisted namespaces, oldest-first in each list. */
export interface BackupData {
    readonly history: readonly string[];
    readonly snippets: readonly SnippetRecord[];
    readonly templates: readonly TemplateRecord[];
    readonly insights: readonly UsageRecord[];
}
/** The export document: schema version, export time, and the payload. */
export interface BackupEnvelope {
    readonly schemaVersion: number;
    readonly exportedAt: number;
    readonly data: BackupData;
}
/** Per-namespace import counts for the record namespaces. */
export interface NamespaceImportCounts {
    readonly added: number;
    readonly updated: number;
    readonly skipped: number;
}
/** Import counts for the plain-string history namespace (no updates possible). */
export interface HistoryImportCounts {
    readonly added: number;
    readonly skipped: number;
}
/** Complete import report, one entry per namespace. */
export interface ImportReport {
    readonly history: HistoryImportCounts;
    readonly snippets: NamespaceImportCounts;
    readonly templates: NamespaceImportCounts;
    readonly insights: NamespaceImportCounts;
}
/** Import caps for the two Config-bounded namespaces (0 = unlimited). */
export interface ImportCaps {
    readonly history: number;
    readonly snippets: number;
}
/**
 * Migrate and validate a parsed (but still unknown) backup value into a
 * {@link BackupEnvelope} at {@link BACKUP_SCHEMA_VERSION}. Unknown newer
 * versions and versions too old to migrate both throw (fail-closed).
 * @param value - the parsed JSON value.
 * @returns the migrated, validated envelope.
 * @throws on a foreign shape, an unknown version, or malformed data.
 */
export declare function migrateBackup(value: unknown): BackupEnvelope;
/**
 * Serialize one backup into the export JSON document.
 * @param data - the four namespaces.
 * @param exportedAt - epoch ms export timestamp (defaults to now).
 * @returns the pretty-printed JSON document.
 */
export declare function serializeBackup(data: BackupData, exportedAt?: number): string;
/**
 * Read all four namespaces out of storage.
 * @param storage - readable storage.
 * @returns the collected namespaces.
 */
export declare function collectBackup(storage: StorageLike): BackupData;
/**
 * Export the current state as a JSON document (no side effects).
 * @param storage - readable storage.
 * @param exportedAt - epoch ms export timestamp (defaults to now).
 * @returns the export document.
 */
export declare function exportBackupJson(storage: StorageLike, exportedAt?: number): string;
/**
 * Parse and migrate a backup JSON document.
 * @param json - the import document.
 * @returns the migrated, validated envelope.
 * @throws on invalid JSON, a foreign shape, an unknown version, or malformed data.
 */
export declare function parseBackup(json: string): BackupEnvelope;
/**
 * Import a backup document: parse, migrate, merge (keep-newest), and write
 * each namespace back through the existing store writers. History and
 * snippets respect the Config caps; templates and insights use their fixed
 * protocol caps.
 * @param storage - readable and writable storage.
 * @param json - the import document.
 * @param caps - history and snippet caps from Config (0 = unlimited).
 * @returns per-namespace added/updated/skipped counts.
 * @throws on invalid JSON, a foreign/unknown version, or malformed data.
 */
export declare function importBackupJson(storage: StorageLike, json: string, caps: ImportCaps): ImportReport;
//# sourceMappingURL=backup.d.ts.map