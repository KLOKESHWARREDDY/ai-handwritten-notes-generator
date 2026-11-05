import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Note } from '../types';
import { api } from '../services/api';

/**
 * Exports the element with id 'handwritten-page-container' as a PNG image file
 */
export async function exportPageToPng(noteTitle: string): Promise<void> {
  const element = document.getElementById('handwritten-page-container');
  if (!element) {
    throw new Error('Notes container not found');
  }

  // Generate canvas with high pixel ratio for crisp handwritten fidelity
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  const safeTitle = (noteTitle || 'handwritten-notes').replace(/[^a-zA-Z0-9_-]/g, '_');
  link.download = `${safeTitle}.png`;
  link.href = imgData;
  link.click();
}

/**
 * Exports the notes to an A4 PDF document.
 * Tries backend ReportLab export first for maximum publication quality;
 * falls back to high-res client-side jsPDF if backend is unreachable.
 */
export async function exportNoteToPdf(note: Note): Promise<void> {
  const safeTitle = (note.title || 'handwritten-notes').replace(/[^a-zA-Z0-9_-]/g, '_');

  try {
    // Attempt backend ReportLab export
    const blob = await api.exportBackendPdf(note);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeTitle}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    return;
  } catch (err) {
    console.warn('Backend PDF export failed, using client-side jsPDF fallback', err);
  }

  // Client-side fallback using html2canvas & jsPDF
  const element = document.getElementById('handwritten-page-container');
  if (!element) {
    throw new Error('Notes container not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  // Standard A4 dimensions in mm: 210 x 297
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${safeTitle}.pdf`);
}
