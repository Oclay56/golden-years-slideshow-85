import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SlideshowProps {
  images: { src: string; caption: string }[];
}

const Slideshow = ({ images }: SlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const containerClasses = isFullscreen 
    ? "fixed inset-0 z-50 bg-black"
    : "max-w-4xl mx-auto bg-purple-900/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-700";

  const imageHeight = isFullscreen ? "h-screen" : "h-[600px]";

  return (
    <div className={containerClasses}>
      <div className="relative">
        <div className={`relative ${imageHeight} overflow-hidden`}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={image.src}
                alt={image.caption}
                className={`w-full h-full ${
                  isFullscreen ? 'object-contain' : 'object-contain'
                } bg-black`}
                style={{ objectPosition: 'center center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-100 backdrop-blur-sm ring-1 ring-yellow-400/30"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-100 backdrop-blur-sm ring-1 ring-yellow-400/30"
          onClick={goToNext}
          aria-label="Next image"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-100 backdrop-blur-sm ring-1 ring-yellow-400/30"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-100 backdrop-blur-sm ring-1 ring-yellow-400/30"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <p className="text-yellow-200 text-xl font-medium text-center animate-fade-in">
            {images[currentIndex]?.caption}
          </p>
        </div>
      </div>

      {!isFullscreen && (
        <div className="p-6 bg-purple-950/80 backdrop-blur-sm border-t border-purple-700">
          <div className="flex justify-center space-x-3 flex-wrap gap-y-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-yellow-400 scale-125 ring-2 ring-yellow-400/50'
                    : 'bg-yellow-400/30 hover:bg-yellow-400/50'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-yellow-200">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slideshow;
