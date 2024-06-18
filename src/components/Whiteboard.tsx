import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { io, Socket } from 'socket.io-client';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
      });
      fabricRef.current = canvas;

      // Configure drawing options
      canvas.freeDrawingBrush.color = 'black';
      canvas.freeDrawingBrush.width = 5;

      // Initialize socket connection
      socketRef.current = io('http://localhost:3001');

      socketRef.current.on('draw', (data) => {
        const path = new fabric.Path(data.path, data.options);
        fabricRef.current?.add(path);
      });

      canvas.on('path:created', (event: any) => {
        const path = event.path;
        if (socketRef.current) {
          socketRef.current.emit('draw', {
            path: path.path,
            options: path.toObject(['left', 'top', 'width', 'height', 'fill', 'stroke', 'strokeWidth', 'strokeDashArray', 'strokeLineCap', 'strokeLineJoin', 'strokeMiterLimit', 'scaleX', 'scaleY', 'angle', 'opacity', 'skewX', 'skewY', 'flipX', 'flipY', 'cornerSize', 'hasControls', 'hasBorders', 'selectable']),
          });
        }
      });

      return () => {
        canvas.dispose();
        socketRef.current?.disconnect();
      };
    }
  }, []);

  const handleUndo = () => {
    if (fabricRef.current) {
      const canvas = fabricRef.current;
      const lastObject = canvas.getObjects().pop();
      if (lastObject) {
        canvas.remove(lastObject);
        canvas.renderAll();
      }
    }
  };

  const handleRedo = () => {
    // Redo functionality can be implemented by maintaining an undo stack
  };

  const handleColorChange = (color: string) => {
    if (fabricRef.current) {
      fabricRef.current.freeDrawingBrush.color = color;
    }
  };

  const handleBrushSizeChange = (size: number) => {
    if (fabricRef.current) {
      fabricRef.current.freeDrawingBrush.width = size;
    }
  };

  const handleSaveAsImage = () => {
    if (fabricRef.current) {
      const dataUrl = fabricRef.current.toDataURL({
        format: 'png',
        quality: 1,
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'whiteboard.png';
      link.click();
    }
  };

  const handleSaveAsPDF = () => {
    if (fabricRef.current && canvasRef.current) {
      html2canvas(canvasRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape');
        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save('whiteboard.pdf');
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={handleUndo}>Undo</button>
        <button className="btn btn-secondary" onClick={handleRedo}>Redo</button>
        <input
          type="color"
          onChange={(e) => handleColorChange(e.target.value)}
          defaultValue="#000000"
          className="form-control form-control-color"
          title="Choose your color"
        />
        <input
          type="number"
          onChange={(e) => handleBrushSizeChange(parseInt(e.target.value))}
          defaultValue={5}
          min={1}
          max={50}
          className="form-control"
          style={{ width: '80px' }}
          title="Brush size"
        />
        <button className="btn btn-success" onClick={handleSaveAsImage}>Save as Image</button>
        <button className="btn btn-warning" onClick={handleSaveAsPDF}>Save as PDF</button>
      </div>
      <canvas ref={canvasRef} width={800} height={600} className="border" />
    </div>
  );
};

export default Whiteboard;
