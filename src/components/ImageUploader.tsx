
import React, { useState } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImagesAdded: (images: { src: string; caption: string }[]) => void;
}

const ImageUploader = ({ onImagesAdded }: ImageUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<{ src: string; caption: string; file: File }[]>([]);

  const handleFiles = (files: FileList) => {
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml'];
    
    Array.from(files).forEach(file => {
      if (validImageTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            src: e.target?.result as string,
            caption: `New image - ${file.name.replace(/\.[^/.]+$/, "")}`,
            file: file
          };
          setUploadedImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const updateCaption = (index: number, caption: string) => {
    setUploadedImages(prev => prev.map((img, i) => 
      i === index ? { ...img, caption } : img
    ));
  };

  const addToSlideshow = () => {
    const imagesToAdd = uploadedImages.map(({ src, caption }) => ({ src, caption }));
    onImagesAdded(imagesToAdd);
    setUploadedImages([]);
  };

  return (
    <div className="space-y-6">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-yellow-400 bg-yellow-400/10'
            : 'border-yellow-400/30 bg-purple-900/20'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
          <p className="text-lg text-yellow-200 mb-2">
            Drop images here or click to browse
          </p>
          <p className="text-sm text-yellow-300">
            Supports: JPG, PNG, GIF, WebP, BMP, SVG
          </p>
        </div>
      </div>

      {uploadedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl text-yellow-300 font-semibold">
            Preview Images ({uploadedImages.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {uploadedImages.map((image, index) => (
              <div key={index} className="bg-purple-900/40 rounded-lg p-4 border border-purple-700">
                <div className="relative mb-3">
                  <img
                    src={image.src}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <input
                  type="text"
                  value={image.caption}
                  onChange={(e) => updateCaption(index, e.target.value)}
                  className="w-full bg-purple-800/50 border border-purple-600 rounded px-3 py-2 text-yellow-200 placeholder-yellow-400/50"
                  placeholder="Add a caption..."
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={addToSlideshow}
              className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold px-6 py-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add {uploadedImages.length} Image{uploadedImages.length !== 1 ? 's' : ''} to Slideshow
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
