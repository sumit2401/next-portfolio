'use client';

import React from 'react';
import ImageMasking from './ImageMasking';

export default function ImageMaskingDemo() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8">Image Masking Demo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Organic Variant */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Organic Variant</h3>
          <ImageMasking
            src="/placeholder-user.jpg"
            alt="Organic masking example"
            width={300}
            height={300}
            variant="organic"
            backgroundColor="#374151"
          />
        </div>

        {/* Grid Variant */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Grid Variant</h3>
          <ImageMasking
            src="/placeholder-user.jpg"
            alt="Grid masking example"
            width={300}
            height={300}
            variant="grid"
            backgroundColor="#1f2937"
          />
        </div>

        {/* Random Variant */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Random Variant</h3>
          <ImageMasking
            src="/placeholder-user.jpg"
            alt="Random masking example"
            width={300}
            height={300}
            variant="random"
            backgroundColor="#111827"
          />
        </div>

        {/* Custom Size Example */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Large Size</h3>
          <ImageMasking
            src="/placeholder-user.jpg"
            alt="Large masking example"
            width={400}
            height={400}
            variant="organic"
            backgroundColor="#4b5563"
          />
        </div>

        {/* Different Background Color */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Custom Background</h3>
          <ImageMasking
            src="/placeholder-user.jpg"
            alt="Custom background example"
            width={300}
            height={300}
            variant="organic"
            backgroundColor="#7c3aed"
          />
        </div>

        {/* With Custom Class */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">With Border</h3>
          <ImageMasking
            src="/placeholder-user.jpg"
            alt="Bordered example"
            width={300}
            height={300}
            variant="organic"
            backgroundColor="#374151"
            className="border-4 border-purple-500 rounded-lg"
          />
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mt-12 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Usage Examples</h3>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium">Basic Usage:</h4>
            <pre className="bg-gray-800 text-green-400 p-2 rounded mt-1 overflow-x-auto">
{`<ImageMasking
  src="/your-image.jpg"
  alt="Description"
  width={400}
  height={400}
/>`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-medium">With Custom Variant:</h4>
            <pre className="bg-gray-800 text-green-400 p-2 rounded mt-1 overflow-x-auto">
{`<ImageMasking
  src="/your-image.jpg"
  alt="Description"
  width={300}
  height={300}
  variant="grid"
  backgroundColor="#1f2937"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}







