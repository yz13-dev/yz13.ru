"use client";
import { useEffect, useRef, useState } from "react";

interface PuzzlePiece {
  x: number;
  y: number;
  width: number;
  height: number;
  imageX: number;
  imageY: number;
  id: number;
  edges: { top: number; right: number; bottom: number; left: number };
}

const piece = {
  width: 100,
  height: 100,
};

const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // обмен элементов
  }
  return shuffled;
};

export default function PuzzleCanvas({ imageSrc }: { imageSrc: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pieces, setPieces] = useState<any[]>([]);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1); // Состояние для зума (переименовано в zoom)

  // Загружаем изображение
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      console.log("Image loaded successfully");
      setImage(img);
    };
  }, [imageSrc]);

  useEffect(() => {
    if (image && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const pieceWidth = piece.width;
        const pieceHeight = piece.height;
        const spacing = 10; // Отступы между кусочками
        const cols = Math.floor(image.width / (pieceWidth + spacing)); // Учитываем отступы
        const rows = Math.floor(image.height / (pieceHeight + spacing)); // Учитываем отступы

        const generatedPieces: any[] = [];

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            generatedPieces.push({
              x: col * (pieceWidth + spacing), // Учитываем отступ
              y: row * (pieceHeight + spacing), // Учитываем отступ
              width: pieceWidth,
              height: pieceHeight,
              imageX: col * pieceWidth,
              imageY: row * pieceHeight,
            });
          }
        }

        // Перемешиваем кусочки
        setPieces(shuffleArray(generatedPieces));
      }
    }
  }, [image]);

  useEffect(() => {
    if (canvasRef.current && pieces.length) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Применяем зум
        ctx.save(); // Сохраняем текущий контекст
        ctx.scale(zoom, zoom); // Масштабируем канвас (переименовано в zoom)

        pieces.forEach((piece) => {
          ctx.drawImage(
            image!,
            piece.imageX,
            piece.imageY,
            piece.width,
            piece.height,
            piece.x,
            piece.y,
            piece.width,
            piece.height,
          );
        });

        ctx.restore(); // Восстанавливаем контекст после масштабирования
      }
    }
  }, [pieces, image, zoom]); // Добавляем зависимость от zoom

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    }
  }, []);

  // Обработчик скролла
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = 0.1; // Чувствительность зума
    if (e.deltaY < 0) {
      // Прокрутка вверх — увеличиваем масштаб
      setZoom((prevZoom) => Math.min(prevZoom + zoomFactor, 3)); // Максимальный зум — 3
    } else {
      // Прокрутка вниз — уменьшаем масштаб
      setZoom((prevZoom) => Math.max(prevZoom - zoomFactor, 0.5)); // Минимальный зум — 0.5
    }
  };

  return <canvas ref={canvasRef} onWheel={handleWheel}></canvas>;
}
