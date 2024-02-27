import React, { useRef, useEffect, useState } from 'react';
import './MorphingFont.css'; // Ensure this path matches your file structure

const MorphingFont = ({ texts }) => {
    const [textIndex, setTextIndex] = useState(0);
    const textRef = useRef(null);

    useEffect(() => {
        // Set initial text without animation
        textRef.current.textContent = texts[textIndex];
        textRef.current.style.opacity = 1;

        const changeText = () => {
            // Fade out current text
            textRef.current.classList.add('fade-out');
            
            setTimeout(() => {
                // Change text after fade-out
                const nextIndex = (textIndex + 1) % texts.length;
                setTextIndex(nextIndex);
                if (textRef.current) {
                    textRef.current.textContent = texts[textIndex];
                    textRef.current.style.opacity = 1;
                }

                // Remove 'fade-out' to reset state, then fade in
                textRef.current.classList.remove('fade-out');
                textRef.current.classList.add('fade-in');
                
                // After fade-in, remove class to allow for next fade-out
                setTimeout(() => {
                    textRef.current.classList.remove('fade-in');
                }, 1000); // This matches the duration of the fade-in animation
            }, 1000); // This matches the duration of the fade-out animation
        };

        // Start the continuous cycle of changing text with fade-in/out
        const interval = setInterval(changeText, 3000); // Adjust time as needed

        return () => clearInterval(interval);
    }, [texts, textIndex]);

    return (
        <div id="container">
            <span ref={textRef} id="text1"></span>
        </div>
    );
};

export default MorphingFont;
