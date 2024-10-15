// components/GameCanvas.tsx
"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Shape, Outline } from '@/utils/Shape';
import Confetti from '@/components/Confetti'; // Import Confetti component

const GameCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [gameRunning, setGameRunning] = useState(false); // Start in paused state
    const [shape, setShape] = useState<Shape | null>(null);
    const [outline, setOutline] = useState<Outline | null>(null);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [fallSpeed, setFallSpeed] = useState(2);
    const [gameMessage, setGameMessage] = useState('');
    const [shapeLanded, setShapeLanded] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [hasLeveledUp, setHasLeveledUp] = useState(false);
    const [levelUpScore, setLevelUpScore] = useState(50);
    const [isGameOver, setIsGameOver] = useState(false);

    // Constants for the grid and blocks
    const BLOCK_SIZE = 50;
    const GRID_COLUMNS = 8;
    const canvasWidth = BLOCK_SIZE * GRID_COLUMNS;
    const canvasHeight = 600;
    const playerMoveSpeed = 5;
    const EXPERIENCE_PER_SUCCESS = 10;

    const [occupiedPositions, setOccupiedPositions] = useState<boolean[]>(
        Array(GRID_COLUMNS).fill(false)
    );

    const getBlockColor = (level: number): string => {
        const colors = [
            '#FFFFFF', // white
            '#FBBF24', // yellow-500
            '#F97316', // orange-500
            '#EF4444', // red-500
            '#8B5CF6', // purple-500
            '#3B82F6', // blue-500
            '#10B981', // green-500
        ];
        return colors[level % colors.length];
    };

    // Handle keyboard input
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!shapeLanded && shape) {
                if (e.key === 'ArrowLeft' && shape.x > 0) {
                    shape.x -= playerMoveSpeed;
                    shape.x = Math.max(0, shape.x);
                } else if (e.key === 'ArrowRight' && shape.x < canvasWidth - shape.size) {
                    shape.x += playerMoveSpeed;
                    shape.x = Math.min(canvasWidth - shape.size, shape.x);
                }
            }
            // Handle spacebar for pause/resume
            if (e.code === 'Space') {
                e.preventDefault();
                setGameRunning((prev) => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shape, shapeLanded, canvasWidth]);

    // Handle mouse movement
    useEffect(() => {
        const canvas = canvasRef.current;
        const handleMouseMove = (e: MouseEvent) => {
            if (!shapeLanded && shape && canvas) {
                const canvasRect = canvas.getBoundingClientRect();
                const mouseX = e.clientX - canvasRect.left;
                shape.x = mouseX - shape.size / 2;
                shape.x = Math.max(0, Math.min(shape.x, canvasWidth - shape.size));
            }
        };
        canvas?.addEventListener('mousemove', handleMouseMove);
        return () => canvas?.removeEventListener('mousemove', handleMouseMove);
    }, [shape, shapeLanded, canvasWidth]);

    // Handle touch movement
    useEffect(() => {
        const canvas = canvasRef.current;
        const handleTouchMove = (e: TouchEvent) => {
            if (!shapeLanded && shape && canvas) {
                const canvasRect = canvas.getBoundingClientRect();
                const touchX = e.touches[0].clientX - canvasRect.left;
                shape.x = touchX - shape.size / 2;
                shape.x = Math.max(0, Math.min(shape.x, canvasWidth - shape.size));
            }
        };
        canvas?.addEventListener('touchmove', handleTouchMove);
        return () => canvas?.removeEventListener('touchmove', handleTouchMove);
    }, [shape, shapeLanded, canvasWidth]);

    const resetShapeAndOutline = useCallback(
        (updatedOccupiedPositions?: boolean[]) => {
            const color = getBlockColor(level);
            setShape(new Shape(BLOCK_SIZE, fallSpeed, canvasWidth, color, level));
            setOutline(
                new Outline(
                    BLOCK_SIZE,
                    canvasWidth,
                    canvasHeight,
                    updatedOccupiedPositions || occupiedPositions
                )
            );
        },
        [fallSpeed, canvasWidth, canvasHeight, level, occupiedPositions]
    );

    const drawProgressBar = useCallback(
        (ctx: CanvasRenderingContext2D) => {
            const progressBarWidth = canvasWidth - 20;
            const progressBarHeight = 20;
            const progressBarX = 10;
            const progressBarY = 60;

            const totalExperienceNeeded = levelUpScore * level;
            const pointsIntoLevel = score - (totalExperienceNeeded - levelUpScore);
            const progress = pointsIntoLevel / levelUpScore;
            const fillWidth = progressBarWidth * progress;

            // Background bar
            ctx.fillStyle = 'grey';
            ctx.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);

            // Filled portion
            ctx.fillStyle = 'green';
            ctx.fillRect(progressBarX, progressBarY, fillWidth, progressBarHeight);

            // Border
            ctx.strokeStyle = 'black';
            ctx.strokeRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);

            // Progress text
            ctx.fillStyle = 'black';
            ctx.font = '16px Arial';
            const progressPercentage = Math.floor(progress * 100);
            const progressText = `${progressPercentage}% to Next Level`;
            ctx.fillText(
                progressText,
                canvasWidth / 2 - ctx.measureText(progressText).width / 2,
                progressBarY + progressBarHeight - 5
            );
        },
        [score, level, levelUpScore, canvasWidth]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        let animationFrameId: number;

        // Initialize shape and outline
        if (ctx && !shape && !outline) {
            resetShapeAndOutline();
        }

        const draw = () => {
            if (!canvas || !ctx || !shape || !outline) return;

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw background gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'lightblue');
            gradient.addColorStop(1, 'lightgreen');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Display 'Pause' message when game is paused
            if (!gameRunning) {
                ctx.fillStyle = 'black';
                ctx.font = '40px Arial';
                const pauseText = 'Pause';
                ctx.fillText(
                    pauseText,
                    canvasWidth / 2 - ctx.measureText(pauseText).width / 2,
                    canvasHeight / 2
                );
            } else {
                // Game logic
                if (!shapeLanded) {
                    shape.update();
                }
                shape.draw(ctx);

                // Draw dead blocks
                for (let i = 0; i < GRID_COLUMNS; i++) {
                    if (occupiedPositions[i]) {
                        ctx.fillStyle = 'gray';
                        ctx.fillRect(
                            i * BLOCK_SIZE,
                            canvasHeight - BLOCK_SIZE - 10,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                    }
                }

                // Draw the outline
                outline.draw(ctx);

                // Check for collision
                if (!shapeLanded && shape.y + shape.size >= outline.y) {
                    const xDifference = Math.abs(shape.x - outline.x);

                    if (xDifference < 1) {
                        // Successful alignment
                        setScore((prev) => prev + EXPERIENCE_PER_SUCCESS);
                        setGameMessage('Great Job!');
                        setShapeLanded(true);

                        // Reset after a delay
                        setTimeout(() => {
                            setGameMessage('');
                            resetShapeAndOutline();
                            setShapeLanded(false);
                        }, 1000);
                    } else {
                        // Missed alignment
                        setScore((prev) => Math.max(0, prev - EXPERIENCE_PER_SUCCESS));
                        setGameMessage('Try Again!');
                        setShapeLanded(true);

                        // Mark position as occupied
                        const columnIndex = Math.floor(outline.x / BLOCK_SIZE);
                        const newOccupiedPositions = [...occupiedPositions];
                        newOccupiedPositions[columnIndex] = true;
                        setOccupiedPositions(newOccupiedPositions);

                        // Check for Game Over
                        if (newOccupiedPositions.every((occupied) => occupied)) {
                            setGameMessage('Game Over!');
                            setGameRunning(false);
                            setIsGameOver(true);
                        } else {
                            // Reset after a delay with updated occupied positions
                            setTimeout(() => {
                                setGameMessage('');
                                resetShapeAndOutline(newOccupiedPositions);
                                setShapeLanded(false);
                            }, 1000);
                        }
                    }
                }

                // Level-up logic
                const totalExperienceNeeded = levelUpScore * level;
                if (score >= totalExperienceNeeded && !hasLeveledUp) {
                    setLevel((prev) => prev + 1);
                    setFallSpeed((prev) => prev + 0.5);
                    setGameMessage(`Level ${level + 1}!`);
                    setHasLeveledUp(true);

                    // Decrease the experience required for the next level by 2.5%
                    setLevelUpScore((prev) => prev * 0.975);
                } else if (score < totalExperienceNeeded && hasLeveledUp) {
                    setHasLeveledUp(false);
                }

                // Display game message
                if (gameMessage) {
                    ctx.fillStyle = 'black';
                    ctx.font = '30px Arial';
                    ctx.fillText(
                        gameMessage,
                        canvasWidth / 2 - ctx.measureText(gameMessage).width / 2,
                        canvasHeight / 2
                    );
                }
            }

            // Display score and level
            ctx.fillStyle = 'black';
            ctx.font = '20px Arial';
            ctx.fillText(`Score: ${score}`, 10, 30);
            ctx.fillText(`Level: ${level}`, canvasWidth - 100, 30);

            // Display progress bar
            drawProgressBar(ctx);

            // Continue the loop
            animationFrameId = requestAnimationFrame(draw);
        };

        draw(); // Start the drawing loop

        return () => cancelAnimationFrame(animationFrameId); // Clean up on unmount
    }, [
        gameRunning,
        shape,
        outline,
        shapeLanded,
        score,
        level,
        fallSpeed,
        gameMessage,
        resetShapeAndOutline,
        drawProgressBar,
        occupiedPositions,
        hasLeveledUp,
        levelUpScore,
        canvasWidth,
        canvasHeight,
    ]);

    const handleRestart = () => {
        const resetPositions = Array(GRID_COLUMNS).fill(false);
        setOccupiedPositions(resetPositions);
        setScore(0);
        setLevel(1);
        setFallSpeed(2);
        setHasLeveledUp(false);
        setLevelUpScore(50);
        setIsGameOver(false);
        setGameRunning(true);
        setGameMessage('');
        resetShapeAndOutline(resetPositions);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">Harmony Blocks Game</h2>

            {/* Game Canvas */}
            <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className="border-2 border-gray-300"
            />

            {/* Controls */}
            <div className="flex space-x-2 mt-4">
                <button onClick={() => setShowInstructions(true)} className="btn btn-primary">
                    Help
                </button>
                {!isGameOver && (
                    <button
                        onClick={() => setGameRunning(!gameRunning)}
                        className="btn btn-secondary flex items-center gap-2"
                    >
                        {gameRunning ? 'Pause' : 'Resume'}
                        <kbd className="kbd kbd-sm">Space</kbd>
                    </button>
                )}
                {isGameOver && (
                    <button onClick={handleRestart} className="btn btn-accent">
                        Restart Game
                    </button>
                )}
            </div>

            {/* Modal for Instructions */}
            {showInstructions && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="font-bold text-lg">How to Play</h2>
                        <p className="py-4">
                            Use the <strong>Left</strong> and <strong>Right Arrow Keys</strong>,{' '}
                            <strong>Mouse</strong>, or <strong>Touch</strong> to move the falling block.
                            Align it with the outlined block at the bottom to score points!
                        </p>
                        <div className="modal-action">
                            <button
                                onClick={() => {
                                    setShowInstructions(false);
                                    setGameRunning(true); // Start the game after closing the modal
                                }}
                                className="btn"
                            >
                                Start Game
                            </button>
                        </div>
                    </div>
                    <div
                        className="modal-backdrop"
                        onClick={() => setShowInstructions(false)}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default GameCanvas;
