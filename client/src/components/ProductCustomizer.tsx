import { useEffect, useRef, useState } from 'react';
import { Canvas, FabricImage } from 'fabric';
import '../assets/styles/App.css';

interface Product {
  name: string;
  price: number;
  image: string;
}

const productImages: Record<string, Product> = {
  tshirt: { name: 'T-shirt', price: 30, image: '/products/shirt.jpg' },
  hoodie: { name: 'Hoodie', price: 60, image: '/products/hoodie-oversized-mockup-white.png' },
  cap: { name: 'Cap', price: 25, image: '/products/cap.jpg' },
};

const designs = [
  '/designs/github-logo2.png',
  '/designs/github-logo3.png',
  '/designs/github-logo5.png',
];

interface CartItem {
  product: Product;
  design: string | null;
  designImage: string;
  total: number;
}

interface ProductCustomizerProps {
  onAddToCart: (item: CartItem) => void;
}

export default function ProductCustomizer({ onAddToCart }: ProductCustomizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [product, setProduct] = useState('tshirt');
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const newCanvas = new Canvas(canvasRef.current, {
      preserveObjectStacking: true,
      backgroundColor: '#fff',
      width: 400,
      height: 400,
    });
    setCanvas(newCanvas);

    return () => {
      newCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;
    updateProductWithDesign();
  }, [canvas, product, selectedDesign]);

  const updateProductWithDesign = async () => {
    if (!canvas) return;

    // Clear the canvas
    canvas.clear();
    canvas.backgroundColor = '#fff';

    try {
      // Load product image
      const productData = productImages[product];
      const productImg = await FabricImage.fromURL(productData.image);

      productImg.set({
        scaleX: canvas.width! / productImg.width!,
        scaleY: canvas.height! / productImg.height!,
        selectable: false,
        evented: false,
      });

      canvas.add(productImg);
      canvas.sendObjectToBack(productImg); // Send to back

      // If a design is selected, overlay it on the product
      if (selectedDesign) {
        const designImg = await FabricImage.fromURL(selectedDesign);

        designImg.set({
          left: canvas.width! / 2,
          top: canvas.height! / 2,
          originX: 'center',
          originY: 'center',
          scaleX: 0.3,
          scaleY: 0.3,
          hasControls: false,
          selectable: true,
        });

        canvas.add(designImg);
        canvas.setActiveObject(designImg);
      }

      canvas.renderAll();
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const selectDesign = async (designSrc: string) => {
    if (!canvas) return;

    // Remove any existing design overlay
    const existingDesign = canvas.getObjects().find(obj => (obj as any).name === 'design-overlay');
    if (existingDesign) {
      canvas.remove(existingDesign);
    }

    try {
      // Load and add the new design
      const designImg = await FabricImage.fromURL(designSrc);

      designImg.set({
        left: canvas.width / 2,
        top: canvas.height / 2,
        originX: 'center',
        originY: 'center',
        scaleX: 0.3,
        scaleY: 0.3,
        hasControls: false,
        selectable: true,
      });

      // Add name property for identification
      (designImg as any).name = 'design-overlay';

      canvas.add(designImg);
      canvas.setActiveObject(designImg);
      canvas.renderAll();

      setSelectedDesign(designSrc);
    } catch (error) {
      console.error('Error loading design:', error);
    }
  };

  const clearDesign = () => {
    if (!canvas) return;

    // Remove the design overlay from canvas
    const existingDesign = canvas.getObjects().find(obj => (obj as any).name === 'design-overlay');
    if (existingDesign) {
      canvas.remove(existingDesign);
      canvas.renderAll();
    }

    setSelectedDesign(null);
  };

  const handleAddToCart = () => {
    if (!canvas || !selectedDesign) return;

    const isReady = window.confirm('Are you ready to go to checkout?');
    
    if (isReady) {
      const productData = productImages[product];
      const designImage = canvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 });
      
      const cartItem: CartItem = {
        product: productData,
        design: selectedDesign,
        designImage: designImage,
        total: productData.price
      };

      onAddToCart(cartItem);
    }
  };

  return (
    <div className="App">
      <h1>Product Customizer</h1>

      <div className="product-selection">
        <label>
          Choose Product:
          <select value={product} onChange={(e) => setProduct(e.target.value)}>
            <option value="tshirt">T-shirt - ${productImages.tshirt.price}</option>
            <option value="hoodie">Hoodie - ${productImages.hoodie.price}</option>
            <option value="cap">Cap - ${productImages.cap.price}</option>
          </select>
        </label>
        
        <div className="price-display">
          <h3>Price: ${productImages[product].price}</h3>
        </div>
      </div>

      <div className="gallery">
        <h3>Select a Design:</h3>
        {designs.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Design ${idx + 1}`}
            onClick={() => selectDesign(src)}
            style={{
              cursor: 'pointer',
              border: selectedDesign === src ? '3px solid #007bff' : '1px solid #ccc',
              margin: '5px',
              maxWidth: '80px',
              maxHeight: '80px'
            }}
          />
        ))}
      </div>

      <div style={{ margin: '10px 0' }}>
        <button onClick={clearDesign} disabled={!selectedDesign}>
          Clear Design
        </button>
      </div>

      <canvas ref={canvasRef} width={400} height={400}></canvas>

      <button onClick={handleAddToCart} disabled={!selectedDesign} className="add-to-cart-btn">
        Add to Cart - ${productImages[product].price}
      </button>
    </div>
  );
}
