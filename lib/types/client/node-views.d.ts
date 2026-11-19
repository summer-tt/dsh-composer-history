/**
 * Runtime-node → recall-view mapping: the pure seam between the client
 * conversation snapshot ({@link ConversationNode}) and the extractor's
 * {@link HistoryNodeView}. Lifted out of the wiring layer so the mapping is
 * unit-testable with structural fakes and stays free of cordis/DOM.
 *
 * Sliding-context integration: `compaction` checkpoint markers (the
 * harness's Claude Code / Codex-style auto-compact summaries) project to a
 * single prefixed text entry, so the summarized history stays reachable
 * from ↑ recall and Ctrl+R search after the model surface has slid past it.
 */
import type { HistoryNodeView } from './recall.js';
/**
 * Local structural contract for the conversation snapshot nodes this plugin
 * reads (user / steering / compaction). Declared locally because the owning
 * package (`@deepseek-ai/dsh-client-ui-conversation`) re-exports the node
 * union from its `client` entry only on the unreleased 0.1.2-alpha.1 host,
 * while the published 0.1.1-rc.2 line keeps the union inside the removed
 * `dsh-client-runtime` package. The runtime contract is structural: the
 * session snapshot provides the same fields under both hosts, and every
 * node kind outside this union projects to no view through the default arm.
 */
/** One text content block — the only block shape the recall views read. */
interface TextContentBlock {
    type: 'text';
    text: string;
}
/** One content block without composer text (images, chips, ...). */
interface OpaqueContentBlock {
    type: string;
}
/** One finalized user message (fields the recall views read). */
interface UserMessageNode {
    kind: 'user';
    seq: number;
    content: readonly (TextContentBlock | OpaqueContentBlock)[];
}
/** One steering message (fields the recall views read). */
interface SteeringMessageNode {
    kind: 'steering';
    seq: number;
    content: readonly (TextContentBlock | OpaqueContentBlock)[];
}
/** One compaction checkpoint marker (fields the recall views read). */
interface CompactionSummaryNode {
    kind: 'compaction';
    seq: number;
    summary: string | null;
}
/** The conversation node kinds the recall views project. */
export type ConversationNode = UserMessageNode | SteeringMessageNode | CompactionSummaryNode;
/** Prefix marking an entry that came from a compaction checkpoint, not the composer. */
export declare const COMPACTED_PREFIX = "[compacted] ";
/**
 * Project one conversation node onto a recall view.
 * @param node - one snapshot node (any kind).
 * @returns the view, or undefined when the node carries no recallable text
 *   (non-text kinds, compaction markers whose summary fell outside the
 *   window, blank content).
 */
export declare function viewOfNode(node: ConversationNode): HistoryNodeView | undefined;
/**
 * Project a snapshot's nodes onto recall views, keeping source order.
 * @param nodes - conversation nodes in seq order.
 * @returns views for every node that carries recallable text.
 */
export declare function viewOfNodes(nodes: readonly ConversationNode[]): HistoryNodeView[];
export {};
//# sourceMappingURL=node-views.d.ts.map