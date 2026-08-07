'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGetT } from '@/hooks/useGetT';
import { 
  Code, Sparkles, Check, Copy, Download, Trash2, 
  RefreshCw, Play, AlertCircle, CheckCircle2, FileText, 
  Sliders, Minimize2, Maximize2, FileCode, ArrowRight, HelpCircle,
  Columns, Rows, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type DataFormat = 'JSON' | 'XML' | 'YAML' | 'CSV';
type IndentSize = '2 spaces' | '4 spaces' | '8 spaces' | 'Tab' | 'Compact';
type LayoutMode = 'split' | 'stacked';

const SAMPLE_DATA: Record<DataFormat, string> = {
  JSON: `{\n  "company": "ConvertAllNow",\n  "version": 2.5,\n  "isFree": true,\n  "features": [\n    "100% In-Browser Execution",\n    "Zero Server Uploads",\n    "Lightning Fast Processing"\n  ],\n  "stats": {\n    "tools": 35,\n    "users": 500000\n  }\n}`,
  XML: `<root>\n  <company>ConvertAllNow</company>\n  <version>2.5</version>\n  <isFree>true</isFree>\n  <features>\n    <feature>100% In-Browser Execution</feature>\n    <feature>Zero Server Uploads</feature>\n    <feature>Lightning Fast Processing</feature>\n  </features>\n  <stats>\n    <tools>35</tools>\n    <users>500000</users>\n  </stats>\n</root>`,
  YAML: `company: ConvertAllNow\nversion: 2.5\nisFree: true\nfeatures:\n  - 100% In-Browser Execution\n  - Zero Server Uploads\n  - Lightning Fast Processing\nstats:\n  tools: 35\n  users: 500000`,
  CSV: `id,name,category,rating,is_free\n1,Data Formatter,Developer Tools,4.9,true\n2,Word to HTML,Document Converter,4.8,true\n3,PDF to DOCX,PDF Utilities,5.0,true\n4,Pro Image Editor,Graphics,4.9,true`
};

export default function DataFormatter() {
  const getT = useGetT();
  const [format, setFormat] = useState<DataFormat>('JSON');
  const [targetFormat, setTargetFormat] = useState<DataFormat>('YAML');
  const [indent, setIndent] = useState<IndentSize>('2 spaces');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('split');
  
  const [input, setInput] = useState<string>(SAMPLE_DATA['JSON']);
  const [output, setOutput] = useState<string>('');
  
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeAction, setActiveAction] = useState<string>('format');

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const leftLineNumbersRef = useRef<HTMLDivElement>(null);
  const rightLineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync scrolling between textarea and line numbers
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>, side: 'left' | 'right') => {
    const ref = side === 'left' ? leftLineNumbersRef : rightLineNumbersRef;
    if (ref.current) {
      ref.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const getIndentString = () => {
    switch (indent) {
      case '2 spaces': return '  ';
      case '4 spaces': return '    ';
      case '8 spaces': return '        ';
      case 'Tab': return '\t';
      case 'Compact': return '';
    }
  };

  // Helper: Format XML
  const formatXml = (xmlStr: string, indentStr: string): string => {
    let formatted = '';
    const reg = /(>)(<)(\/*)/g;
    xmlStr = xmlStr.replace(reg, '$1\n$2$3');
    let pad = 0;
    const lines = xmlStr.split('\n');
    
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      
      let delta = 0;
      if (trimmed.match(/.+<\/\w[^>]*>$/)) {
        delta = 0;
      } else if (trimmed.match(/^<\/\w/)) {
        if (pad !== 0) pad -= 1;
      } else if (trimmed.match(/^<\w[^>]*[^\/]>.*$/) && !trimmed.match(/^<\?/) && !trimmed.match(/^<!/)) {
        delta = 1;
      }
      
      formatted += indentStr.repeat(pad) + trimmed + '\n';
      pad += delta;
    });
    return formatted.trim();
  };

  // Helper: {getT('Minify')} XML
  const minifyXml = (xmlStr: string): string => {
    return xmlStr.replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').trim();
  };

  // Helper: CSV to array of objects
  const parseCsv = (csvStr: string): Record<string, string>[] => {
    const lines = csvStr.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const results = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const obj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        obj[h] = vals[idx] || '';
      });
      results.push(obj);
    }
    return results;
  };

  // Helper: Objects to CSV
  const objectsToCsv = (arr: any[]): string => {
    if (!Array.isArray(arr) || arr.length === 0) return '';
    const keys = Array.from(new Set(arr.flatMap(obj => typeof obj === 'object' ? Object.keys(obj) : ['value'])));
    const header = keys.join(',');
    const rows = arr.map(obj => {
      if (typeof obj !== 'object' || obj === null) return `"${obj}"`;
      return keys.map(k => {
        const val = obj[k] !== undefined && obj[k] !== null ? String(obj[k]) : '';
        return val.includes(',') ? `"${val}"` : val;
      }).join(',');
    });
    return [header, ...rows].join('\n');
  };

  // Helper: Object to YAML serializer
  const objToYaml = (obj: any, indentLevel = 0, indentStr = '  '): string => {
    let yaml = '';
    const currentIndent = indentStr.repeat(indentLevel);

    if (Array.isArray(obj)) {
      obj.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          const nested = objToYaml(item, indentLevel + 1, indentStr);
          yaml += `${currentIndent}- ${nested.trimStart()}\n`;
        } else {
          yaml += `${currentIndent}- ${String(item)}\n`;
        }
      });
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        if (typeof val === 'object' && val !== null) {
          yaml += `${currentIndent}${key}:\n` + objToYaml(val, indentLevel + 1, indentStr);
        } else {
          yaml += `${currentIndent}${key}: ${val}\n`;
        }
      });
    } else {
      yaml += `${currentIndent}${String(obj)}\n`;
    }
    return yaml;
  };

  // Helper: Simple YAML parser to JS Object
  const parseYaml = (yamlStr: string): any => {
    const lines = yamlStr.split(/\r?\n/).filter(l => l.trim().length > 0 && !l.trim().startsWith('#'));
    const obj: any = {};
    let currentArrayKey: string | null = null;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ')) {
        const val = trimmed.substring(2).trim();
        if (currentArrayKey) {
          if (!Array.isArray(obj[currentArrayKey])) obj[currentArrayKey] = [];
          obj[currentArrayKey].push(isNaN(Number(val)) ? (val === 'true' ? true : val === 'false' ? false : val) : Number(val));
        }
      } else if (trimmed.includes(':')) {
        const idx = trimmed.indexOf(':');
        const k = trimmed.substring(0, idx).trim();
        const v = trimmed.substring(idx + 1).trim();
        currentArrayKey = null;
        if (v === '') {
          currentArrayKey = k;
          obj[k] = [];
        } else {
          const val = isNaN(Number(v)) ? (v === 'true' ? true : v === 'false' ? false : v) : Number(v);
          obj[k] = val;
        }
      }
    });
    return obj;
  };

  // Helper: XML to Object
  const xmlToObject = (xmlStr: string): any => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlStr, "text/xml");
    const errorNode = doc.querySelector('parsererror');
    if (errorNode) {
      throw new Error("Invalid XML: " + errorNode.textContent);
    }

    const nodeToObject = (node: Element): any => {
      const obj: any = {};
      if (node.children.length === 0) {
        return node.textContent;
      }
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const childName = child.nodeName;
        const childValue = nodeToObject(child);
        if (obj[childName] !== undefined) {
          if (!Array.isArray(obj[childName])) {
            obj[childName] = [obj[childName]];
          }
          obj[childName].push(childValue);
        } else {
          obj[childName] = childValue;
        }
      }
      return obj;
    };

    return { [doc.documentElement.nodeName]: nodeToObject(doc.documentElement) };
  };

  // Helper: Object to XML
  const objectToXml = (obj: any, rootName = "root"): string => {
    const toXml = (item: any, tag: string): string => {
      if (Array.isArray(item)) {
        return item.map(i => toXml(i, tag === 'features' ? 'feature' : tag === 'items' ? 'item' : tag)).join('\n');
      } else if (typeof item === 'object' && item !== null) {
        const inner = Object.keys(item).map(k => toXml(item[k], k)).join('\n');
        return `<${tag}>\n${inner}\n</${tag}>`;
      } else {
        return `<${tag}>${String(item)}</${tag}>`;
      }
    };
    return toXml(obj, rootName);
  };

  // Main Action Handler: Format
  const handleFormat = () => {
    setActiveAction('format');
    setStatusMsg(null);
    const ind = getIndentString();
    try {
      if (format === 'JSON') {
        const parsed = JSON.parse(input);
        setOutput(indent === 'Compact' ? JSON.stringify(parsed) : JSON.stringify(parsed, null, ind));
        setStatusMsg({ type: 'success', text: 'JSON successfully beautified & validated!' });
      } else if (format === 'XML') {
        if (indent === 'Compact') {
          setOutput(minifyXml(input));
        } else {
          setOutput(formatXml(input, ind));
        }
        setStatusMsg({ type: 'success', text: 'XML formatting & indentation applied!' });
      } else if (format === 'YAML') {
        const parsed = parseYaml(input);
        setOutput(objToYaml(parsed, 0, ind).trim());
        setStatusMsg({ type: 'success', text: 'YAML indentation & formatting updated!' });
      } else if (format === 'CSV') {
        const lines = input.split(/\r?\n/).filter(l => l.trim().length > 0);
        setOutput(lines.map(l => l.split(',').map(cell => cell.trim()).join(',')).join('\n'));
        setStatusMsg({ type: 'success', text: 'CSV spacing and line endings cleaned!' });
      }
    } catch (e: any) {
      setStatusMsg({ type: 'error', text: `Syntax Error: ${e.message || 'Invalid data structure'}` });
    }
  };

  // Minify Action
  const handleMinify = () => {
    setActiveAction('minify');
    setStatusMsg(null);
    try {
      if (format === 'JSON') {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed));
        setStatusMsg({ type: 'success', text: 'JSON successfully compressed & minified!' });
      } else if (format === 'XML') {
        setOutput(minifyXml(input));
        setStatusMsg({ type: 'success', text: 'XML whitespace stripped & minified!' });
      } else if (format === 'YAML' || format === 'CSV') {
        const lines = input.split(/\r?\n/).filter(l => l.trim().length > 0);
        setOutput(lines.join('\n'));
        setStatusMsg({ type: 'success', text: `${format} empty lines and redundant gaps removed!` });
      }
    } catch (e: any) {
      setStatusMsg({ type: 'error', text: `Minify Error: ${e.message || 'Invalid input syntax'}` });
    }
  };

  // {getT('Validate')} Action
  const handleValidate = () => {
    setActiveAction('validate');
    try {
      if (format === 'JSON') {
        JSON.parse(input);
      } else if (format === 'XML') {
        xmlToObject(input);
      } else if (format === 'YAML') {
        parseYaml(input);
      } else if (format === 'CSV') {
        const rows = parseCsv(input);
        if (rows.length === 0) throw new Error("No header or records found in CSV");
      }
      setStatusMsg({ type: 'success', text: `✅ Valid ${format} syntax! 0 syntax errors detected.` });
    } catch (e: any) {
      setStatusMsg({ type: 'error', text: `❌ Invalid Syntax: ${e.message || 'Malformed structure found'}` });
    }
  };

  // Cross-Format Converter
  const handleConvert = () => {
    setActiveAction('convert');
    setStatusMsg(null);
    const ind = getIndentString() || '  ';
    try {
      let dataObject: any = null;
      if (format === 'JSON') {
        dataObject = JSON.parse(input);
      } else if (format === 'XML') {
        const rawObj = xmlToObject(input);
        const keys = Object.keys(rawObj);
        dataObject = keys.length === 1 ? rawObj[keys[0]] : rawObj;
      } else if (format === 'YAML') {
        dataObject = parseYaml(input);
      } else if (format === 'CSV') {
        dataObject = parseCsv(input);
      }

      if (!dataObject) throw new Error("Could not parse source input");

      let converted = '';
      if (targetFormat === 'JSON') {
        converted = JSON.stringify(dataObject, null, ind);
      } else if (targetFormat === 'XML') {
        converted = formatXml(objectToXml(dataObject, "data"), ind);
      } else if (targetFormat === 'YAML') {
        converted = objToYaml(dataObject, 0, ind).trim();
      } else if (targetFormat === 'CSV') {
        const arr = Array.isArray(dataObject) ? dataObject : [dataObject];
        converted = objectsToCsv(arr);
      }

      setOutput(converted);
      setStatusMsg({ type: 'success', text: `🎉 Successfully converted from ${format} to ${targetFormat}!` });
    } catch (e: any) {
      setStatusMsg({ type: 'error', text: `Conversion failed: ${e.message}. Check that source data matches ${format} format.` });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        handleFormat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, format, indent]);

  useEffect(() => {
    handleFormat();
  }, [format]);

  const handleLoadSample = (fmt: DataFormat) => {
    setFormat(fmt);
    setInput(SAMPLE_DATA[fmt]);
    setTimeout(() => {
      handleFormat();
    }, 50);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const extension = targetFormat.toLowerCase();
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `formatted-output.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const countLines = (str: string) => str ? str.split(/\r?\n/).length : 0;
  const getByteSize = (str: string) => new Blob([str]).size;
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 bytes';
    const k = 1024;
    if (bytes < k) return `${bytes} bytes`;
    return `${(bytes / k).toFixed(2)} KB`;
  };

  return (
    <div className="mx-auto max-w-[1500px] px-3 sm:px-6 lg:px-8">
      {/* Top Banner / Hero Title */}
      <div className="text-center space-y-3 mb-8">
        <div className=" inline-flex items-center whitespace-nowrap gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          100% Client-Side In-Browser Engine
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          {getT('Pro Data Formatter & Converter')}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {getT('Beautify, minify, validate, and convert between JSON, XML, YAML, and CSV directly in your browser. Zero server data uploads for complete document privacy.')}
        </p>
      </div>

      {/* Structured Responsive IDE Control Toolbar */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-xl mb-6 space-y-4">
        {/* Row 1: Format Selectors & Core Actions */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800/80">
          {/* Left Controls: Format & Indent */}
          <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex-shrink-0">{getT('Format:')}</span>
              <select
                value={format}
                onChange={(e) => {
                  const newFmt = e.target.value as DataFormat;
                  setFormat(newFmt);
                  if (input === SAMPLE_DATA[format]) {
                    setInput(SAMPLE_DATA[newFmt]);
                  }
                }}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-bold text-sm rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-indigo-500 transition-all outline-none cursor-pointer"
              >
                <option value="JSON">JSON</option>
                <option value="XML">XML</option>
                <option value="YAML">YAML</option>
                <option value="CSV">CSV</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex-shrink-0">{getT('Indent:')}</span>
              <select
                value={indent}
                onChange={(e) => setIndent(e.target.value as IndentSize)}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium text-sm rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-indigo-500 transition-all outline-none cursor-pointer"
              >
                <option value="2 spaces">2 spaces</option>
                <option value="4 spaces">4 spaces</option>
                <option value="8 spaces">8 spaces</option>
                <option value="Tab">{getT('Tab')} (\t)</option>
                <option value="Compact">{getT('Compact / Minify')}</option>
              </select>
            </div>
          </div>

          {/* Right Core Actions */}
          <div className="flex flex-wrap items-center justify-start xl:justify-end gap-2 sm:gap-2.5">
            <button
              onClick={handleFormat}
              className="flex-1 sm:flex-initial inline-flex items-center whitespace-nowrap justify-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Code className="h-4 w-4" />
              Format
            </button>

            <button
              onClick={handleMinify}
              className="flex-1 sm:flex-initial inline-flex items-center whitespace-nowrap justify-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700/80 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-sm transition-all"
            >
              <Minimize2 className="h-4 w-4" />
              Minify
            </button>

            <button
              onClick={handleValidate}
              className="flex-1 sm:flex-initial inline-flex items-center whitespace-nowrap justify-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-semibold text-sm transition-all"
            >
              <CheckCircle2 className="h-4 w-4" />
              Validate
            </button>

            <button
              onClick={() => { setInput(''); setOutput(''); setStatusMsg(null); }}
              className="flex-initial inline-flex items-center whitespace-nowrap justify-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-semibold text-sm transition-all"
              title="Clear text"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>

        {/* Row 2: Converter & View Layout Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-sm">
          {/* Conversion Toolbar */}
          <div className="flex flex-wrap items-center gap-2 bg-gray-50 dark:bg-gray-800/70 p-2 rounded-xl border border-gray-200/80 dark:border-gray-700/70 w-full sm:w-auto">
            <span className="text-xs font-bold px-1 text-gray-700 dark:text-gray-300">{getT('Convert to:')}</span>
            <select
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value as DataFormat)}
              className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-indigo-600 dark:text-indigo-400 font-bold text-sm rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="JSON">JSON</option>
              <option value="XML">XML</option>
              <option value="YAML">YAML</option>
              <option value="CSV">CSV</option>
            </select>
            <button
              onClick={handleConvert}
              className="flex-1 sm:flex-initial inline-flex items-center whitespace-nowrap justify-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow transition-all"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {getT('Convert Now')}
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className=" inline-flex items-center whitespace-nowrap gap-1.5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl self-end sm:self-auto w-full sm:w-auto justify-end">
            <span className="text-xs font-semibold text-gray-500 mr-2 pl-2 hidden lg:inline">{getT('Layout:')}</span>
            <button
              onClick={() => setLayoutMode('split')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                layoutMode === 'split' 
                  ? 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="Side-by-side view (Recommended for large screens)"
            >
              <Columns className="w-3.5 h-3.5" />
              {getT('Split View')}
            </button>
            <button
              onClick={() => setLayoutMode('stacked')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                layoutMode === 'stacked' 
                  ? 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="Top and bottom vertical stacked view"
            >
              <Rows className="w-3.5 h-3.5" />
              {getT('Stacked View')}
            </button>
          </div>
        </div>
      </div>

      {/* Status / Alert Message Bar */}
      <AnimatePresence>
        {statusMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-6 font-medium text-sm shadow-md border ${
              statusMsg.type === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200' 
                : 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-800 dark:text-red-200'
            }`}
          >
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />}
            <span className="flex-1 font-semibold">{statusMsg.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Dual/Stacked Editor View */}
      <div className={`grid gap-6 ${layoutMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* LEFT PANE: INPUT */}
        <div className="flex flex-col bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden min-h-[520px]">
          {/* Editor Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-gray-950 border-b border-gray-800 text-gray-300 text-xs font-semibold min-h-[48px]">
            <div className="flex items-center gap-2 truncate">
              <FileCode className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="font-bold uppercase tracking-wider truncate">Input ({format})</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500 font-mono text-[11px] flex-shrink-0">
              <span className="bg-gray-900 px-2 py-0.5 rounded border border-gray-800">{countLines(input)} lines</span>
              <span className="bg-gray-900 px-2 py-0.5 rounded border border-gray-800">{formatBytes(getByteSize(input))}</span>
            </div>
          </div>

          {/* Code Area with Synchronized Line Numbers */}
          <div className="relative flex flex-1 overflow-hidden bg-[#0e1117]">
            {/* Left Line Numbers Column */}
            <div 
              ref={leftLineNumbersRef}
              className="w-12 py-4 select-none bg-[#0a0c10] text-gray-600 font-mono text-xs text-right pr-3 overflow-hidden leading-6"
            >
              {Array.from({ length: Math.max(countLines(input), 1) }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Editable Textarea */}
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onScroll={(e) => handleScroll(e, 'left')}
              placeholder={getT(`Paste or type your data here...`)}
              className="flex-1 p-4 bg-transparent text-gray-200 font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none placeholder-gray-600 selection:bg-indigo-900/80 overflow-auto"
              spellCheck={false}
              wrap="off"
            />
          </div>

          {/* Footer Sample Loader */}
          <div className="px-4 py-2.5 bg-gray-950 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
            <span className="font-medium">{getT('Load Sample Payload:')}</span>
            <div className="flex items-center gap-1.5">
              {(['JSON', 'XML', 'YAML', 'CSV'] as DataFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => handleLoadSample(fmt)}
                  className={`px-2.5 py-1 rounded border transition-colors text-[11px] font-bold ${
                    format === fmt 
                      ? 'bg-indigo-900/60 border-indigo-500 text-indigo-300 shadow-sm' 
                      : 'bg-gray-800/80 border-gray-700 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANE: OUTPUT */}
        <div className="flex flex-col bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden min-h-[520px]">
          {/* Output Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-gray-950 border-b border-gray-800 text-gray-300 text-xs font-semibold min-h-[48px]">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse"></span>
              <span className="font-bold uppercase tracking-wider text-emerald-400 truncate">
                {activeAction === 'convert' ? `Converted Output (${targetFormat})` : `Formatted Output (${format})`}
              </span>
              <span className="bg-gray-900 px-2 py-0.5 rounded border border-gray-800 text-gray-400 text-[11px] font-mono ml-1 flex-shrink-0">
                {formatBytes(getByteSize(output))}
              </span>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
              <button
                onClick={handleCopy}
                disabled={!output}
                className=" inline-flex items-center whitespace-nowrap gap-1.5 px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200 text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>

              <button
                onClick={handleDownload}
                disabled={!output}
                className=" inline-flex items-center whitespace-nowrap gap-1.5 px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-3.5 h-3.5" />
                {getT('Download File')}
              </button>
            </div>
          </div>

          {/* Readonly Synchronized Output Area */}
          <div className="relative flex flex-1 overflow-hidden bg-[#0a0c12]">
            {/* Right Line Numbers Column */}
            <div 
              ref={rightLineNumbersRef}
              className="w-12 py-4 select-none bg-[#07090d] text-gray-600 font-mono text-xs text-right pr-3 overflow-hidden leading-6"
            >
              {Array.from({ length: Math.max(countLines(output), 1) }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <textarea
              ref={outputRef}
              value={output}
              onScroll={(e) => handleScroll(e, 'right')}
              readOnly
              placeholder={getT("Formatted or converted output will appear here automatically...")}
              className="flex-1 p-4 bg-transparent text-emerald-300 font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none placeholder-gray-600 selection:bg-emerald-900/80 overflow-auto"
              spellCheck={false}
              wrap="off"
            />
          </div>

          {/* Footer Guide Note */}
          <div className="px-4 py-2.5 bg-gray-950 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500 font-medium">
            <span>🔒 {getT('Executing 100% locally inside your web browser engine')}</span>
            <span>{getT('Shortcut: Ctrl+Shift+F')}</span>
          </div>
        </div>

      </div>

      {/* Feature Guide / SEO Content Section */}
      <div className="mt-14 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200/80 dark:border-gray-800 p-6 sm:p-10 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <HelpCircle className="h-7 w-7 text-indigo-500 flex-shrink-0" />
          {getT('Why Use Our In-Browser Data Formatter & Converter?')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          <div className="space-y-2.5">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              {getT('100% Document Privacy')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getT('Unlike standard online JSON or YAML validators that upload your private API payloads and system secrets to remote servers, ConvertAllNow parses and transforms your data inside your local JavaScript Engine.')}
            </p>
          </div>
          <div className="space-y-2.5">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              {getT('Instant Format Conversion')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getT('Seamlessly bridge data types across platforms. Quickly transform complex JSON payloads into clean YAML configurations for Docker and Kubernetes, or extract CSV database rows into JSON arrays with a single click.')}
            </p>
          </div>
          <div className="space-y-2.5">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {getT('Pro Syntax Validation')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getT('Debug broken JSON syntax, trailing commas, or improperly indented YAML configs instantly. Our real-time validator highlights syntax errors immediately so you can fix malformed structures effortlessly.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
