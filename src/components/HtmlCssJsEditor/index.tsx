import React, { useState, useRef, useCallback, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

type Tab = 'html' | 'css' | 'js';

interface HtmlCssJsEditorProps {
  defaultHtml?: string;
  defaultCss?: string;
  defaultJs?: string;
  title?: string;
}

function EditorInner({ defaultHtml = '', defaultCss = '', defaultJs = '', title }: HtmlCssJsEditorProps) {
  const [activeTab, setActiveTab] = useState<Tab>('html');
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [js, setJs] = useState(defaultJs);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const code = activeTab === 'html' ? html : activeTab === 'css' ? css : js;
  const setCode = activeTab === 'html' ? setHtml : activeTab === 'css' ? setCss : setJs;

  const updatePreview = useCallback(() => {
    if (!iframeRef.current) return;
    setConsoleOutput([]);
    const srcdoc = `<!DOCTYPE html>
<html>
<head><style>${css}</style></head>
<body>
${html}
<script>
(function() {
  const _log = console.log;
  const _error = console.error;
  function send(type, args) {
    window.parent.postMessage({ type: 'console', method: type, args: Array.from(args).map(a => { try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); } catch { return String(a); } }) }, '*');
  }
  console.log = function() { send('log', arguments); _log.apply(console, arguments); };
  console.error = function() { send('error', arguments); _error.apply(console, arguments); };
  window.onerror = function(msg, src, line) { send('error', ['Fout op regel ' + line + ': ' + msg]); };
})();
try { ${js} } catch(e) { console.error(e.message); }
</script>
</body></html>`;
    iframeRef.current.srcdoc = srcdoc;
  }, [html, css, js]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'console') {
        const prefix = e.data.method === 'error' ? '❌ ' : '';
        setConsoleOutput(prev => [...prev, prefix + e.data.args.join(' ')]);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updatePreview, 300);
    return () => clearTimeout(timer);
  }, [updatePreview]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newValue);
      requestAnimationFrame(() => { target.selectionStart = target.selectionEnd = start + 2; });
    }
  }, [code, setCode]);

  return (
    <div className={styles.editor}>
      {title && <div className={styles.editorTitle}>{title}</div>}
      <div className={styles.layout}>
        <div className={styles.codePanel}>
          <div className={styles.tabs}>
            {(['html', 'css', 'js'] as Tab[]).map(t => (
              <button key={t} className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`} onClick={() => setActiveTab(t)}>
                {t === 'js' ? 'JavaScript' : t.toUpperCase()}
              </button>
            ))}
          </div>
          <textarea className={styles.textarea} value={code} onChange={e => setCode(e.target.value)} onKeyDown={handleKeyDown} spellCheck={false} placeholder={`Schrijf hier je ${activeTab.toUpperCase()} code...`} />
        </div>
        <div className={styles.previewPanel}>
          <div className={styles.previewHeader}><span>Resultaat</span><button className={styles.refreshButton} onClick={updatePreview}>↻ Ververs</button></div>
          <iframe ref={iframeRef} className={styles.iframe} sandbox="allow-scripts" title="Preview" />
          {consoleOutput.length > 0 && (
            <div className={styles.console}>
              <div className={styles.consoleHeader}><span>Console</span><button className={styles.clearButton} onClick={() => setConsoleOutput([])}>Wissen</button></div>
              <pre className={styles.consoleOutput}>{consoleOutput.join('\n')}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HtmlCssJsEditor(props: HtmlCssJsEditorProps) {
  return (
    <BrowserOnly fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Editor laden...</div>}>
      {() => <EditorInner {...props} />}
    </BrowserOnly>
  );
}
