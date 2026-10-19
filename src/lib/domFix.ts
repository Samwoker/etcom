/**
 * DOM monkeypatch to prevent React reconciliation crashes when Google Translate,
 * browser translation tools, or browser extensions wrap/modify DOM text nodes in <font> tags.
 *
 * React expects text nodes to remain direct children of their original fiber parent.
 * When translation extensions reparent these nodes, React's removeChild and insertBefore
 * calls throw:
 * "NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node."
 *
 * References:
 * - https://github.com/facebook/react/issues/11538
 * - https://github.com/facebook/react/issues/24712
 */

export function installDomPolyfills() {
  if (typeof window === 'undefined' || typeof Node === 'undefined' || !Node.prototype) {
    return;
  }

  // Patch removeChild
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      if (child.parentNode) {
        return child.parentNode.removeChild(child) as T;
      }
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };

  // Patch insertBefore
  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(
    newNode: T,
    referenceNode: Node | null
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (referenceNode.parentNode) {
        return referenceNode.parentNode.insertBefore(newNode, referenceNode) as T;
      }
      return newNode;
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

// Automatically install upon import
installDomPolyfills();
