export class DesignGuideTab {
  constructor() {
    this.panel = null;
  }

  load() {
    this.panel = document.querySelector('.tab-panel[data-panel="design-guide"]');
    if (!this.panel) return;

    this.panel.innerHTML = `
      <div class="panel-header">
        <div class="card-title-row">
          <h2>Design Guide</h2>
          <span class="muted">Live reference for layout, typography, and responsive patterns.</span>
        </div>
      </div>

      <div class="stack">
        <div class="card">
          <div class="card-title">Design principles</div>
          <ul class="checklist">
            <li><strong>Start with content.</strong> Map core tasks and write real UI copy before drawing layout.</li>
            <li><strong>Build with tokens.</strong> Use color, type, and spacing tokens for consistency.</li>
            <li><strong>Design for flow.</strong> Primary actions should be obvious, secondary actions subdued.</li>
            <li><strong>Responsive by default.</strong> Let containers flex, then add breakpoints only when needed.</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-title">Typography scale</div>
          <div class="design-guide-grid">
            <div class="type-sample">
              <div class="type-label">Heading • 24px</div>
              <div class="type-preview type-preview--xl">Design systems keep teams aligned.</div>
            </div>
            <div class="type-sample">
              <div class="type-label">Body • 16px</div>
              <div class="type-preview">Use body text for descriptions and supporting detail.</div>
            </div>
            <div class="type-sample">
              <div class="type-label">Caption • 14px</div>
              <div class="type-preview type-preview--sm">Helper text, hints, and metadata go here.</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Spacing rhythm</div>
          <p class="muted">Use multiples of 4 for layout spacing and padding to keep vertical rhythm consistent.</p>
          <div class="spacing-scale">
            <div class="spacing-chip">4px</div>
            <div class="spacing-chip">8px</div>
            <div class="spacing-chip">12px</div>
            <div class="spacing-chip">16px</div>
            <div class="spacing-chip">24px</div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Button + toast samples</div>
          <p class="muted">Click a button to preview the button style and the matching toast notification.</p>
          <div class="button-grid">
            <button class="btn btn--primary" type="button" data-toast-type="success">Primary action</button>
            <button class="btn" type="button" data-toast-type="info">Neutral action</button>
            <button class="btn btn--ghost" type="button" data-toast-type="warning">Ghost warning</button>
            <button class="btn btn--danger" type="button" data-toast-type="error">Destructive action</button>
            <button class="btn btn--success" type="button" data-toast-type="success">Success action</button>
            <button class="btn btn--warning" type="button" data-toast-type="loading">Loading action</button>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Core palette</div>
          <div class="design-guide-grid">
            <div class="swatch">
              <span class="swatch-color" style="background: var(--primary-color);"></span>
              <div>
                <div class="swatch-title">Primary</div>
                <div class="muted">Actions, highlights, links</div>
              </div>
            </div>
            <div class="swatch">
              <span class="swatch-color" style="background: var(--success-color);"></span>
              <div>
                <div class="swatch-title">Success</div>
                <div class="muted">Positive outcomes</div>
              </div>
            </div>
            <div class="swatch">
              <span class="swatch-color" style="background: var(--warning-color);"></span>
              <div>
                <div class="swatch-title">Warning</div>
                <div class="muted">Cautionary states</div>
              </div>
            </div>
            <div class="swatch">
              <span class="swatch-color" style="background: var(--danger-color);"></span>
              <div>
                <div class="swatch-title">Danger</div>
                <div class="muted">Destructive actions</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Responsive layout checklist</div>
          <ol class="checklist">
            <li>Containers use <code>min()</code> with padding so content never touches edges.</li>
            <li>Primary sections use flex/grid with wrapping instead of fixed widths.</li>
            <li>At 768px, reduce spacing and switch multi-column grids to a single column.</li>
            <li>At 480px, allow horizontal scroll for dense rows like tab bars.</li>
          </ol>
          <div class="inline-actions">
            <a class="btn btn--ghost" href="./DESIGN_AUDIT_CHECKLIST.md" target="_blank" rel="noopener">Open full checklist</a>
          </div>
        </div>
      </div>
    `;

    const toast = window.toastManager;
    this.panel.querySelectorAll('[data-toast-type]').forEach((button) => {
      button.addEventListener('click', () => {
        const type = button.dataset.toastType;
        if (!toast) return;

        if (type === 'success') {
          toast.success('Action completed successfully.');
          return;
        }

        if (type === 'error') {
          toast.error('Something went wrong. Please retry.', { title: 'Failed' });
          return;
        }

        if (type === 'warning') {
          toast.show({
            type: 'warning',
            title: 'Heads up',
            message: 'This action needs extra review.',
            timeoutMs: 3500,
          });
          return;
        }

        if (type === 'loading') {
          const loadingId = toast.loading('Processing request…', { title: 'Working', delayMs: 0 });
          window.setTimeout(() => {
            toast.update(loadingId, {
              type: 'success',
              title: 'Complete',
              message: 'Request finished successfully.',
              timeoutMs: 2500,
              dismissible: true,
            });
          }, 1400);
          return;
        }

        toast.show({
          type: 'info',
          title: 'FYI',
          message: 'This is an informational toast sample.',
          timeoutMs: 3000,
        });
      });
    });
  }
}
