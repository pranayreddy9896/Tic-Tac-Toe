import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
    let [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);
    
    // Use an array of refs for the boxes
    let boxRefs = useRef([...Array(9)].map(() => React.createRef()));

    const toggle = (e, num) => {
        if (lock || data[num] !== "") return; // Prevent overwriting moves

        let newData = [...data];
        if (count % 2 === 0) {
            newData[num] = "x";
            e.target.innerHTML = `<img src="${cross_icon}" alt="X">`;
        } else {
            newData[num] = "o";
            e.target.innerHTML = `<img src="${circle_icon}" alt="O">`;
        }

        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (newData) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                won(newData[a]);
                return;
            }
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Congratulations: <img src="${winner === "x" ? cross_icon : circle_icon}" alt="${winner}">`;
    };

    const reset = () => {
        setLock(false);
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        titleRef.current.innerHTML = `Tic Tac Toe Game `;

        // Clear the boxes
        boxRefs.current.forEach((box) => {
            if (box.current) box.current.innerHTML = "";
        });
    };

    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}> Tic-Tac-Toe Game  </h1>
            <div className='board'>
                {[0, 1, 2].map((row) => (
                    <div className="row" key={row}>
                        {[0, 1, 2].map((col) => {
                            let index = row * 3 + col;
                            return (
                                <div
                                    key={index}
                                    className="boxes"
                                    ref={boxRefs.current[index]}
                                    onClick={(e) => toggle(e, index)}
                                ></div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <button className='reset' onClick={reset}> Reset</button>
        </div>
    );
};

export default TicTacToe;
