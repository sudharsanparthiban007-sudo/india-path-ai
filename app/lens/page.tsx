'use client';

import { useState, useRef, useEffect } from 'react';
import { useLang } from '@/lib/LangContext';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

interface SelectedImage {
  base64: string;
  mime: string;
  url: string;
  fileName: string;
  fileSize: string;
}

export default function LensPage() {
  const { t, lang } = useLang();
  const [image, setImage] = useState<SelectedImage | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [isNative] = useState(() => typeof window !== 'undefined' && Capacitor.isNativePlatform());
  const fileRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFile = (file: File) => {
    setError(null);
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const isImage = validMimes.includes(file.type) || file.type.startsWith('image/');

    if (!isImage) {
      setError('Please select a valid JPG, PNG, or WEBP image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const [header, base64] = dataUrl.split(',');
      const mime = header.match(/:(.*?);/)?.[1] || file.type || 'image/jpeg';
      setImage({
        base64,
        mime,
        url: dataUrl,
        fileName: file.name || 'heritage-photo.jpg',
        fileSize: formatFileSize(file.size),
      });
      setResult(null);
    };
    reader.onerror = () => {
      setError('Failed to read selected image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const triggerPhotoInput = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setError(null);

    if (Capacitor.isNativePlatform()) {
      try {
        const photo = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Base64,
          source: CameraSource.Prompt,
        });

        if (photo.base64String) {
          const mime = photo.format ? `image/${photo.format}` : 'image/jpeg';
          const dataUrl = `data:${mime};base64,${photo.base64String}`;
          setImage({
            base64: photo.base64String,
            mime,
            url: dataUrl,
            fileName: `camera-photo.${photo.format || 'jpg'}`,
            fileSize: 'Camera Capture',
          });
          setResult(null);
          return;
        }
      } catch (err) {
        console.warn('Native camera capture fallback to file picker:', err);
      }
    }

    // Fallback or Web
    if (fileRef.current) {
      fileRef.current.value = '';
      fileRef.current.click();
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    setResult(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const analyze = async () => {
    if (!image || loading) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch('/api/lens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: image.base64,
          mimeType: image.mime,
          language: lang,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || 'Failed to analyze image. Please try again.');
        return;
      }

      setResult(data.content);
      setIsMock(Boolean(data.mock));
    } catch (e: unknown) {
      console.error('Heritage Lens analysis error:', e);
      setError('Network or server error while connecting to Heritage AI. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center sm:text-left mb-8">
        <h1 className="text-3xl font-bold gradient-text flex items-center justify-center sm:justify-start gap-2.5">
          <span>🔍</span> {t('lens_title')}
        </h1>
        <p className="text-stone-400 mt-2 text-sm leading-relaxed">
          {isNative
            ? 'Snap or select a photo of any monument, temple gopuram, sculpture, or inscription to uncover its historical background with AI.'
            : 'Upload a photo of a monument, temple architecture, or ancient inscription for instant AI-powered historical context and identification.'}
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileRef}
        id="lens-file-input"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg,image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {/* Upload & Preview Area */}
      <div
        id="lens-upload-area"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={(e) => {
          if (!image) triggerPhotoInput(e);
        }}
        className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center transition-all mb-6 ${
          image
            ? 'border-purple-500/40 bg-stone-900/80 shadow-2xl'
            : dragging
            ? 'border-purple-400 bg-purple-500/15 cursor-pointer scale-[1.01]'
            : 'border-stone-700 hover:border-purple-500/50 hover:bg-white/[0.02] cursor-pointer'
        }`}
      >
        {image ? (
          <div className="space-y-4">
            {/* Image Preview */}
            <div className="relative inline-block max-w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt="Heritage Preview"
                className="max-h-72 sm:max-h-80 w-auto mx-auto rounded-2xl object-contain shadow-2xl border border-white/10"
              />
              <button
                onClick={removeImage}
                title="Remove photo"
                className="absolute -top-3 -right-3 w-8 h-8 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg transition-transform hover:scale-110"
              >
                ✕
              </button>
            </div>

            {/* Filename & Info Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5">
                <span>📁</span> {image.fileName}
              </span>
              <span className="px-2.5 py-1.5 rounded-xl bg-stone-800 border border-white/10 text-stone-400 text-xs font-medium">
                {image.fileSize}
              </span>
              <span className="px-2.5 py-1.5 rounded-xl bg-stone-800 border border-white/10 text-stone-400 text-xs uppercase">
                {image.mime.replace('image/', '')}
              </span>
            </div>

            {/* Change Photo Action */}
            <div className="pt-2">
              <button
                type="button"
                id="lens-change-photo-btn"
                onClick={triggerPhotoInput}
                className="px-4 py-2 rounded-xl glass border border-white/20 text-xs text-stone-300 hover:text-white hover:border-purple-500/40 transition-all inline-flex items-center gap-1.5"
              >
                <span>🔄</span> {isNative ? 'Retake / Choose Another Photo' : 'Select Different Photo'}
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-3xl shadow-inner">
              {isNative ? '📸' : '📷'}
            </div>
            <div>
              <p className="text-white font-semibold text-base mb-1">
                {isNative ? 'Tap to Capture or Pick from Gallery' : t('lens_upload')}
              </p>
              <p className="text-stone-400 text-xs">
                Drag & drop your image here or browse your device
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-400 text-[11px]">
                Accepts JPG, PNG, and WEBP
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-950/80 border border-red-500/60 rounded-2xl text-red-200 text-sm flex items-start gap-3 shadow-lg animate-fadeIn">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <div className="flex-1">
            <p className="font-semibold mb-0.5">Analysis Issue</p>
            <p className="text-red-300 text-xs leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      {/* Analyse Button */}
      <button
        id="lens-analyze-btn"
        onClick={analyze}
        disabled={!image || loading}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl shadow-purple-600/20 mb-8 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>{t('lens_analyzing')}</span>
          </>
        ) : (
          <>
            <span>✨</span>
            <span>{t('lens_analyze')}</span>
          </>
        )}
      </button>

      {/* Loading Progress State */}
      {loading && (
        <div className="glass rounded-3xl p-6 mb-8 text-center border border-purple-500/30 animate-pulse space-y-3">
          <div className="text-3xl">🏛️</div>
          <p className="text-purple-300 font-semibold text-sm">
            Examining monument features & architectural style...
          </p>
          <p className="text-stone-400 text-xs">
            Consulting Tamil Nadu heritage knowledge base with Gemini Vision AI
          </p>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className="glass rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-fadeIn">
          <div className="p-6 bg-stone-900/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🏛️</span>
              <div>
                <h2 className="text-lg font-bold text-white">{t('lens_result_title')}</h2>
                <p className="text-stone-400 text-xs">AI-Powered Heritage Identification</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-semibold">
              Analysis Complete
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {isMock && (
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 text-sm flex items-center gap-2">
                <span>⚠️</span>
                <span>{t('lens_mock_note')}</span>
              </div>
            )}

            {/* Formatted AI Output */}
            <div className="text-stone-200 text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-4">
              {result}
            </div>

            {/* MANDATORY DISCLAIMER — non-dismissible */}
            <div id="lens-disclaimer" className="p-4 bg-red-950/60 border border-red-500/40 rounded-2xl mt-6">
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-lg flex-shrink-0">⚠️</span>
                <div>
                  <span className="font-semibold text-red-200 text-xs block mb-1">
                    Heritage Research & Verification Disclaimer
                  </span>
                  <p className="text-red-300/90 text-xs leading-relaxed">
                    {t('lens_disclaimer')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

