import React, { useRef, useEffect, useState } from 'react';
import LayoutDetail from "../components/LayoutDetail";
import Link from "next/link";
import { SketchPicker } from 'react-color';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';

export default function Home() {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [displayShapePicker, setDisplayShapePicker] = useState(false);
    const [selectedShape, setSelectedShape] = useState(null);
    const [color, setColor] = useState({ r: 255, g: 255, b: 255 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imgPosition, setImgPosition] = useState({ x: 0, y: 0 });
    const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
    const [originalImageData, setOriginalImageData] = useState(null);
    const [shapes, setShapes] = useState([]);
    const [showMaterialForm, setShowMaterialForm] = useState(false);

    useEffect(() => {
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
            setImagePosition({
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height
            });
        }
    }, []);

    const handleImageLoad = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = imgRef.current;
    
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    
        // Store original image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setOriginalImageData(imageData);
    };

    const handleImageError = () => {
        console.error('Image failed to load');
    };

    const changeColor = (color) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    
        // Restore the original image data
        ctx.putImageData(originalImageData, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const whiteThreshold = 200;
    
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
    
            if (r > whiteThreshold && g > whiteThreshold && b > whiteThreshold) {
                data[i] = color.r;
                data[i + 1] = color.g;
                data[i + 2] = color.b;
            }
        }
    
        ctx.putImageData(imageData, 0, 0);
    
        // Redraw the uploaded image
        if (uploadedImage) {
            ctx.drawImage(uploadedImage, imgPosition.x, imgPosition.y, imgDimensions.width, imgDimensions.height);
        }
    };

    const handleColorChange = (color) => {
        setColor(color.rgb);
        changeColor(color.rgb);
    };

    const toggleColorPalette = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const toggleShapePicker = () => {
        setDisplayShapePicker(!displayShapePicker);
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setUploadedImage(img);
                    setImgPosition({ x: 0, y: 0 });
                    setImgDimensions({ width: img.width, height: img.height });
                    drawUploadedImage(img, 0, 0);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const drawUploadedImage = (img, dx = 0, dy = 0) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Redraw the base image
        ctx.putImageData(originalImageData, 0, 0);
    
        // Draw the uploaded image
        ctx.drawImage(img, dx, dy, img.width, img.height);
    
        // If color is applied, process image pixels to change white color
        if (color) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const whiteThreshold = 200;
    
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
    
                if (r > whiteThreshold && g > whiteThreshold && b > whiteThreshold) {
                    data[i] = color.r;
                    data[i + 1] = color.g;
                    data[i + 2] = color.b;
                }
            }
    
            // Reapply modified image data
            ctx.putImageData(imageData, 0, 0);
    
            // Redraw uploaded image over processed image
            ctx.drawImage(img, dx, dy, img.width, img.height);
        }
    };

    const handleCanvasMouseDown = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
    
        if (uploadedImage && offsetX >= imgPosition.x && offsetX <= imgPosition.x + imgDimensions.width &&
            offsetY >= imgPosition.y && offsetY <= imgPosition.y + imgDimensions.height) {
            setDragStartPos({ x: offsetX - imgPosition.x, y: offsetY - imgPosition.y });
            setIsDragging(true);
        }
    };

    const handleCanvasMouseMove = (e) => {
        if (!isDragging) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        let dx = offsetX - dragStartPos.x;
        let dy = offsetY - dragStartPos.y;
    
        dx = Math.max(Math.min(dx, canvas.width - imgDimensions.width), 0);
        dy = Math.max(Math.min(dy, canvas.height - imgDimensions.height), 0);
    
        setImgPosition({ x: dx, y: dy });
        redrawImage(dx, dy);
    };

    const handleCanvasMouseUp = () => {
        setIsDragging(false);
    };

    const redrawImage = (dx, dy) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        // Restore the original image data
        ctx.putImageData(originalImageData, 0, 0);
    
        // Redraw the uploaded image
        if (uploadedImage) {
            ctx.drawImage(uploadedImage, dx, dy, imgDimensions.width, imgDimensions.height);
        }

        if (color) {
            ctx.putImageData(originalImageData, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const whiteThreshold = 200;
        
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
        
                if (r > whiteThreshold && g > whiteThreshold && b > whiteThreshold) {
                    data[i] = color.r;
                    data[i + 1] = color.g;
                    data[i + 2] = color.b;
                }
            }
        
            ctx.putImageData(imageData, 0, 0);

            if (uploadedImage) {
                ctx.drawImage(uploadedImage, dx, dy, imgDimensions.width, imgDimensions.height);
            }
        }

        shapes.forEach(shape => {
            drawShape(ctx, shape);
        });
    };

    const drawShape = (ctx, shape) => {
        const { type, x, y } = shape;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // For demonstration, change as needed
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        switch (type) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(x, y, 50, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                break;
            case 'rectangle':
                ctx.fillRect(x - 50, y - 25, 100, 50);
                ctx.strokeRect(x - 50, y - 25, 100, 50);
                break;
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(x, y - 50);
                ctx.lineTo(x + 50, y + 50);
                ctx.lineTo(x - 50, y + 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                break;
            case 'star':
                drawStar(ctx, x, y, 5, 50, 25);
                break;
            case 'heart':
                drawHeart(ctx, x, y, 50);
                break;
            case 'pentagon':
                drawRegularPolygon(ctx, x, y, 5, 50);
                break;
            case 'hexagon':
                drawRegularPolygon(ctx, x, y, 6, 50);
                break;
            default:
                break;
        }
    };

    // Helper function to draw a star
    const drawStar = (ctx, x, y, points, outerRadius, innerRadius) => {
        ctx.beginPath();
        const step = Math.PI / points;
        let rotation = Math.PI / 2 * 3;
        ctx.moveTo(x, y - outerRadius);
        for (let i = 0; i < points; i++) {
            ctx.lineTo(x + Math.cos(rotation) * outerRadius, y + Math.sin(rotation) * outerRadius);
            rotation += step;
            ctx.lineTo(x + Math.cos(rotation) * innerRadius, y + Math.sin(rotation) * innerRadius);
            rotation += step;
        }
        ctx.lineTo(x, y - outerRadius);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };
    
    // Helper function to draw a heart
    const drawHeart = (ctx, x, y, size) => {
        ctx.beginPath();
        ctx.moveTo(x, y + size / 4);
        ctx.bezierCurveTo(x + size / 2, y - size / 4, x + size, y + size / 2, x, y + size);
        ctx.bezierCurveTo(x - size, y + size / 2, x - size / 2, y - size / 4, x, y + size / 4);
        ctx.fill();
        ctx.stroke();
    };
    
    // Helper function to draw regular polygons
    const drawRegularPolygon = (ctx, x, y, sides, radius) => {
        const angle = (Math.PI * 2) / sides;
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            ctx.lineTo(x + radius * Math.cos(angle * i), y + radius * Math.sin(angle * i));
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };

    const handleShapeSelect = (shape) => {
        setSelectedShape(shape);
        setDisplayShapePicker(false);
    };

    const handleDragStart = (e, shape) => {
        e.dataTransfer.setData('shape', shape);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const shape = e.dataTransfer.getData('shape');
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const newShape = { type: shape, x: offsetX, y: offsetY };
        setShapes(prevShapes => [...prevShapes, newShape]);
        // Immediately redraw the image with the new shape
        redrawImage(imgPosition.x, imgPosition.y);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const toggleMaterialForm = () => {
        setShowMaterialForm(!showMaterialForm);
    };

    return (
        <div>
            <LayoutDetail>
                <div className="px-4">
                    <p className="font-bold text-4xl px-2 border-solid border-2 border-black">Front Side</p>
                    <p className="font-bold text-base text-gray-500 px-2 py-4">Tip: You can change the project title!</p>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <Link href="/template">
                                <div className="mr-4 flex items-center">
                                    <ArrowBackOutlinedIcon className="w-6 h-6 text-white" />
                                    <span className="ml-2">Go Back</span>
                                </div>
                            </Link>
                            <div className="mr-4 flex items-center" onClick={toggleColorPalette}>
                                <FormatColorFillOutlinedIcon className="w-6 h-6" />
                                <span className="ml-2">Background Color</span>
                            </div>
                            <div className="mr-4 flex items-center">
                                <label htmlFor="imageUpload" className="cursor-pointer">
                                    <AddPhotoAlternateOutlinedIcon className="w-6 h-6" />
                                    <span className="ml-2">Image Upload</span>
                                    <input id="imageUpload" type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                                </label>
                            </div>
                            <div className="mr-4 flex items-center" onClick={toggleShapePicker}>
                                <InterestsOutlinedIcon className="w-6 h-6" />
                                <span className="ml-2">Insert Shapes</span>
                            </div>
                            <div className="mr-4 flex items-center" onClick={toggleMaterialForm}>
                                <AddHomeOutlinedIcon className="w-6 h-6" />
                                <span className="ml-2">Material</span>
                            </div>
                        </div>
                    </div>
                    {!showMaterialForm && (
                    <div className="container bg-white mx-auto px-4 border-2 border-black" id="t-shirt-content">
                        <div className="w-full h-full mx-auto p-4 py-4 grid md:grid-cols-1">
                            <div className="rounded-xl relative">
                                <div className="w-auto rounded-xl items-center justify-center">
                                    <div className="bg-black/50 rounded-xl text-white mb-4 p-2">
                                        <p className="font-bold text-2xl text-text-light">T-SHIRT</p>
                                    </div>
                                    <div className="relative">
                                        <img
                                            src="/assets/OFF-STYLE/8.png"
                                            ref={imgRef}
                                            alt="T-Shirt"
                                            style={{ display: 'none' }}
                                            onLoad={handleImageLoad}
                                            onError={handleImageError}
                                            className="max-h-80 max-w-80 w-full h-full object-cover rounded-xl"
                                        />
                                        <canvas
                                            ref={canvasRef}
                                            onMouseDown={handleCanvasMouseDown}
                                            onMouseMove={handleCanvasMouseMove}
                                            onMouseUp={handleCanvasMouseUp}
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            className="w-full h-full object-cover rounded-xl"
                                        ></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}

                    {displayColorPicker && (
                        <div className="absolute top-0 right-0 mt-16 mr-4">
                            <SketchPicker color={color} onChangeComplete={handleColorChange} />
                        </div>
                    )}

                    {displayShapePicker && (
                        <div className="absolute top-0 right-0 mt-16 mr-4 bg-white shadow-lg p-4 rounded-lg">
                            <h3 className="font-bold mb-2 text-text-light">Select a shape</h3>
                            <ul className="space-y-2">
                                <li
                                    className="cursor-pointer flex items-center text-text-light"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, 'circle')}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                    <span className="ml-2">Circle</span>
                                </li>
                                <li
                                    className="cursor-pointer flex items-center text-text-light"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, 'rectangle')}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="4" y="8" width="16" height="8" />
                                    </svg>
                                    <span className="ml-2">Rectangle</span>
                                </li>
                                <li
                                    className="cursor-pointer flex items-center text-text-light"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, 'triangle')}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="12,4 20,20 4,20" />
                                    </svg>
                                    <span className="ml-2">Triangle</span>
                                </li>
                                <li
                                    className="cursor-pointer flex items-center text-text-light"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, 'star')}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" />
                                    </svg>
                                    <span className="ml-2">Star</span>
                                </li>
                                <li
                                    className="cursor-pointer flex items-center text-text-light"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, 'heart')}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 21C12 21 3 13.656 3 7.5C3 4.416 5.416 2 8.5 2C10.244 2 11.916 2.81 12 4.09C12.084 2.81 13.756 2 15.5 2C18.584 2 21 4.416 21 7.5C21 13.656 12 21 12 21Z" />
                                    </svg>
                                    <span className="ml-2">Heart</span>
                                </li>
                                <li
                                    className="cursor-pointer flex items-center text-text-light"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, 'pentagon')}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="12,2 4,9 7,20 17,20 20,9" />
                                    </svg>
                                    <span className="ml-2">Pentagon</span>
                                </li>
                                <li
                                    className="cursor-pointer flex items-center text-text-light"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, 'hexagon')}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="12,2 19,8 19,16 12,22 5,16 5,8" />
                                    </svg>
                                    <span className="ml-2">Hexagon</span>
                                </li>
                            </ul>
                        </div>
                    )}

                    {showMaterialForm && (
                        <div className="container text-text-light bg-white mx-auto px-4 border-2 border-black mt-4">
                            <h2 className="font-bold text-xl mb-4">Material Form</h2>
                            <form>
                                <div>
                                    <label>Other Printing Method (Additional):</label>
                                    <input type="text" placeholder="DTG Printing (By Default)" className="border rounded p-2 w-full mb-4" />
                                </div>
                                <div>
                                    <label>Color Details (Additional):</label>
                                    <input type="text" placeholder="Plain Color (By Default)" className="border rounded p-2 w-full mb-4" />
                                </div>
                                <div>
                                    <label>Front View Notes:</label>
                                    <textarea className="border rounded p-2 w-full mb-4" rows="3"></textarea>
                                </div>
                                <div>
                                    <label>General Notes:</label>
                                    <textarea className="border rounded p-2 w-full mb-4" rows="3"></textarea>
                                </div>
                                <div>
                                    <label>Sizes & Quantity:</label>
                                    <div className="flex space-x-4 mb-4">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            XS
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            S
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            M
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            L
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            XL
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            2XL
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            3XL
                                        </label>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <label className="mr-2">QTY:</label>
                                        <input type="number" className="border rounded p-2 w-20" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="container items-center mx-auto py-4">
                        <a href="#" title=""
                            className="relative z-10 inline-flex items-center justify-center w-full px-3 py-3 text-lg font-bold text-white border-2 border-transparent rounded-xl font-pj"
                            role="button">
                            View Result
                        </a>
                    </div>
                </div>
            </LayoutDetail>
        </div>
    );
}
