import { useState } from "react";
import Slideshow from "@/components/Slideshow";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Images, Upload } from "lucide-react";

const Index = () => {
  const [showUploader, setShowUploader] = useState(false);
  const [slideshowImages, setSlideshowImages] = useState([
    {
      src: '/lovable-uploads/90119110-a910-4e62-b732-42b5b2e89a0f.png',
      caption: 'Gathering together, sharing stories and laughter'
    },
    {
      src: '/lovable-uploads/2fa7fc04-aecf-4f3a-94d7-440a919895e0.png',
      caption: 'Warm smiles and cherished friendships'
    },
    {
      src: '/lovable-uploads/8c6cae49-036f-4744-a95d-bce2c2fd8c39.png',
      caption: 'The music and memories that bring us together'
    },
    {
      src: '/lovable-uploads/70994c8f-a78b-42db-9917-b7a7ca03fdd3.png',
      caption: 'A wonderful evening filled with joy and celebration'
    },
    {
      src: '/lovable-uploads/7b89d453-797d-45a9-93d0-b22661536fe4.png',
      caption: 'Dancing and celebrating 59 years of friendship'
    },
    {
      src: '/lovable-uploads/fd76bf61-0aea-45a0-b639-cf4038b8fc9c.png',
      caption: 'Archer HS Class of 1985 - Together again with endless smiles'
    },
    {
      src: '/lovable-uploads/9830edc8-5761-4a0a-9cde-579b9ca1f146.png',
      caption: 'Class unity in purple and gold - Archer High School pride'
    },
    {
      src: '/lovable-uploads/958898b9-d557-44a2-89ef-c546da502bef.png',
      caption: 'Friends celebrating under the tent - Class of \'85 spirit'
    },
    {
      src: '/lovable-uploads/cdea4522-80bf-4fb1-b9ca-e1102106f298.png',
      caption: 'Playground fun - reliving our youthful energy together'
    },
    {
      src: '/lovable-uploads/4da4106d-a0c6-41f4-b5de-bcf5efdfc408.png',
      caption: 'Nature backdrop - Class of 1985 in perfect harmony'
    },
    {
      src: '/lovable-uploads/8dab02bf-5e15-4c41-b2b9-61cd423c0057.png',
      caption: 'Honoring our memories - a beautiful memorial display'
    },
    {
      src: '/lovable-uploads/a727bd97-8dee-4f19-9e39-b7c9206d04bc.png',
      caption: 'Casual moments and genuine connections'
    },
    {
      src: '/lovable-uploads/247d46d7-d48f-4466-b281-a8c428d426f7.png',
      caption: 'Unexpected reunions - the joy of reconnecting with classmates'
    },
    {
      src: '/lovable-uploads/4f9ba17f-9c15-44ce-a42a-3442a622ae4e.png',
      caption: 'Class of 1985 celebration cakes - marking 39 years together'
    },
    {
      src: '/lovable-uploads/3e757bcf-15ed-42ee-adef-6d1ecc5a6616.png',
      caption: 'Happy 55th Birthday celebration - still celebrating together'
    },
    {
      src: '/lovable-uploads/846fd208-4120-4382-b896-12d0478fa611.png',
      caption: 'Elegant moments - dressed up and feeling great'
    },
    {
      src: '/lovable-uploads/1815a0d3-430e-40c8-9fe0-3630719c1ab4.png',
      caption: 'Dancing with style - keeping the party alive'
    },
    {
      src: '/lovable-uploads/116c5d82-195b-499e-ab3d-98c1a4902638.png',
      caption: 'Seated together - sharing memories and catching up'
    },
    {
      src: '/lovable-uploads/4811af3e-9231-42e9-85f3-00437e27db53.png',
      caption: 'Victory celebration - class spirit never dies'
    },
    {
      src: '/lovable-uploads/1a6d9e9a-3380-49d3-99c7-7d9bdd474b58.png',
      caption: 'DJ booth fun - keeping the music and energy flowing'
    },
    {
      src: '/lovable-uploads/8c7de5f7-ef6c-4d47-9ece-5bb13aa50d8f.png',
      caption: 'Sweet embrace - 55th birthday love and friendship'
    },
    {
      src: '/lovable-uploads/a7912338-536c-4290-8588-c5ef8e9607c9.png',
      caption: 'Purple and gold pride - Archer High School Class of 1985'
    },
    {
      src: '/lovable-uploads/a474238b-4e1c-4986-b7b6-fbd1ae141835.png',
      caption: 'Dance floor energy - the Class of 1985 still knows how to party'
    },
    {
      src: '/lovable-uploads/_60A4709.png',
      caption: 'Celebrating lifelong bonds and friendships'
    },
    {
      src: '/lovable-uploads/_60A4708.png',
      caption: 'Joy and laughter - memories that last forever'
    }
  ]);

  const handleImagesAdded = (newImages: { src: string; caption: string }[]) => {
    setSlideshowImages(prev => [...prev, ...newImages]);
    setShowUploader(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-yellow-400 mb-4 font-serif animate-fade-in">
            Class of 1985
          </h1>
          <h2 className="text-3xl text-yellow-300 mb-2">
            59th Anniversary Celebration
          </h2>
          <p className="text-lg text-yellow-200 italic">
            Celebrating friendship, memories, and togetherness
          </p>
        </div>
        
        <div className="flex justify-center mb-6">
          <Button
            onClick={() => setShowUploader(!showUploader)}
            className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold px-6 py-3"
          >
            {showUploader ? <Images className="h-5 w-5 mr-2" /> : <Upload className="h-5 w-5 mr-2" />}
            {showUploader ? 'View Slideshow' : 'Add More Photos'}
          </Button>
        </div>

        {showUploader ? (
          <div className="max-w-4xl mx-auto">
            <ImageUploader onImagesAdded={handleImagesAdded} />
          </div>
        ) : (
          <>
            <Slideshow images={slideshowImages} />
            
            <div className="text-center mt-8">
              <p className="text-yellow-200 text-lg">
                A beautiful reunion of lifelong friendships 💕
              </p>
              <p className="text-yellow-300 text-sm mt-2">
                {slideshowImages.length} photos in collection
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
