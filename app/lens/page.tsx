'use client';

import { useState, useRef, useEffect } from 'react';
import { useLang } from '@/lib/LangContext';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export default function LensPage() {
  const { t, lang } = useLang();
  const [image, setImage] = useState<{ base64: string; mime: string; url: string } | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMock, setIsMock] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const [header, base64] = dataUrl.split(',');
      const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
      setImage({ base64, mime, url: dataUrl });
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  // Branch on native vs web
  const triggerPhotoInput = async () => {
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
          setImage({ base64: photo.base64String, mime, url: dataUrl });
          setResult(null);
        }
      } catch (err) {
        // User cancelled or permission denied
        console.warn('Native camera capture cancelled or failed:', err);
      }
    } else {
      fileRef.current?.click();
    }
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/lens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: image.base64, mimeType: image.mime, language: lang }),
      });
      const data = await res.json();
      setResult(data.content);
      setIsMock(data.mock);
    } catch (e) {
      console.error(e);
      setResult('Failed to analyse image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold gradient-text mb-2">{t('lens_title')}</h1>
      <p className="text-stone-400 mb-8 text-sm">
        {isNative
          ? 'Take or select a photo of a monument or inscription using your device camera.'
          : 'Upload a photo of a monument, inscription, or sign for AI-powered heritage context.'}
      </p>

      {/* Upload / Camera area */}
      <div
        id="lens-upload-area"
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={triggerPhotoInput}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all mb-6 ${
          dragging ? 'border-orange-400 bg-orange-500/10' : 'border-stone-700 hover:border-orange-500/50 hover:bg-white/3'
        }`}
      >
        <input
          ref={fileRef}
          id="lens-file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
        />

        {image ? (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt="Uploaded"
              className="max-h-64 mx-auto rounded-xl object-contain mb-3 shadow-lg"
            />
            <p className="text-stone-400 text-sm">
              {isNative ? 'Tap to retake / change photo' : 'Click or drag to replace'}
            </p>
          </div>
        ) : (
          <div>
            <div className="text-5xl mb-4">{isNative ? '📸' : '📷'}</div>
            <p className="text-stone-300 font-medium mb-1">
              {isNative ? 'Tap to Open Camera / Gallery' : t('lens_upload')}
            </p>
            <p className="text-stone-600 text-sm">
              {isNative ? 'Native Camera Capture' : 'JPG, PNG, WEBP supported'}
            </p>
          </div>
        )}
      </div>

      {/* Analyze button */}
      <button
        id="lens-analyze-btn"
        onClick={analyze}
        disabled={!image || loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-violet-500 hover:to-purple-500 transition-all mb-8"
      >
        {loading ? t('lens_analyzing') : t('lens_analyze')}
      </button>

      {/* Result */}
      {result && (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">{t('lens_result_title')}</h2>
          </div>
          <div className="p-5">
            {isMock && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-sm">
                {t('lens_mock_note')}
              </div>
            )}
            <div className="text-stone-300 text-sm leading-relaxed whitespace-pre-wrap mb-6">
              {result}
            </div>

            {/* MANDATORY DISCLAIMER — always shown, non-dismissible */}
            <div id="lens-disclaimer" className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl">
              <div className="flex gap-2">
                <span className="text-red-400 flex-shrink-0">⚠️</span>
                <p className="text-red-300 text-xs leading-relaxed">
                  <span className="font-semibold block mb-1">Important Disclaimer</span>
                  {t('lens_disclaimer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
