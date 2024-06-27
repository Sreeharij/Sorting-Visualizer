import React, { useState,useEffect,useRef } from "react";
import generate_array from "./generate_array";
import './visualizer.css';
import BubbleSort from './sorting_algorithms/BubbleSort';
import InsertionSort from './sorting_algorithms/InsertionSort';
import MergeSort from "./sorting_algorithms/MergeSort";
import SelectionSort from "./sorting_algorithms/SelectionSort";
import QuickSort from "./sorting_algorithms/QuickSort";

export default function Sorting_Visualizer() {
    const [array, setArray] = useState(generate_array(100));  
    const [stopsignal, setStopsignal] = useState(false);
    const stopsignalRef = useRef(stopsignal);
    const [array_swaps,setArray_swaps] = useState(0);

    useEffect(() => {
        stopsignalRef.current = stopsignal;
    }, [stopsignal]);
    
    const handleGenerateArray = () => {
        const new_array = generate_array(100);
        setArray(new_array);
        setStopsignal(false);   
        setArray_swaps(a => 0);
    };

    const handleStopsignal = () => {
        setStopsignal(true);   
        setArray_swaps(a => 0);
    };

    const handleQuickSort = async() => {
        setStopsignal(false);
        let changes = QuickSort([...array]);
        let bars = document.getElementsByClassName("array-value-bar");
        let color = bars[0].style.backgroundColor;
        for(const element of changes){
            if (stopsignalRef.current) break;
            setArray_swaps(a => a+1);  
            await new Promise((resolve) => setTimeout(resolve, 10));
            let [first,second] = element;
            bars[first].style.backgroundColor = "red";
            bars[second].style.backgroundColor = "rgb(100, 0, 0)";
            let temp_height = bars[first].style.height;
            bars[first].style.height = bars[second].style.height;
            bars[second].style.height = temp_height;
            await new Promise((resolve) => setTimeout(resolve, 10));
            bars[first].style.backgroundColor = color;
            bars[second].style.backgroundColor = color;   
        }
        setStopsignal(false);
    }

    const handleMergeSort = async() => {
        setStopsignal(false);
        let changes = MergeSort([...array]);
        let bars = document.getElementsByClassName("array-value-bar");
        let color = bars[0].style.backgroundColor;
        for(const element of changes){
            if (stopsignalRef.current) break;  
            setArray_swaps(a => a+1);
            let [idx,value] = element;
            await new Promise((resolve) => setTimeout(resolve,1));
            bars[idx].style.backgroundColor = "red";
            bars[idx].style.height = value;
            await new Promise((resolve) => setTimeout(resolve,1));
            bars[idx].style.backgroundColor = color;
        }
        setStopsignal(false);
    }

    const handleSelectionSort = async() => {
        setStopsignal(false);
        let changes = SelectionSort([...array]);
        let bars = document.getElementsByClassName("array-value-bar");
        let color = bars[0].style.backgroundColor;
        for(const element of changes){
            if (stopsignalRef.current) break;  
            if(element.length == 1){
                bars[element[0]].style.backgroundColor = "red";
                await new Promise((resolve) => setTimeout(resolve, 1));
                bars[element[0]].style.backgroundColor = color;
            }
            else{
                setArray_swaps(a => a+1);
                let [first, second] = element;
                let temp_height = bars[first].style.height;
                bars[first].style.height = bars[second].style.height;
                bars[second].style.height = temp_height;
            }
        }
        setStopsignal(false);
    }

    const handleInsertionSort = async() => {
        setStopsignal(false);
        let changes = InsertionSort([...array]);
        let bars = document.getElementsByClassName("array-value-bar");
        let color = bars[0].style.backgroundColor;
        for(const element of changes) {
            if (stopsignalRef.current) break;  
            setArray_swaps(a => a+1);
            if(element.length==3){
                bars[element[1]].style.height = `${element[2]}px`;
                bars[element[1]].style.backgroundColor = "red";
                await new Promise((resolve) => setTimeout(resolve,1));
                bars[element[1]].style.backgroundColor = color;
                continue;
            }
            let [first, second] = element;
            bars[second].style.backgroundColor = "red";
            bars[first].style.backgroundColor = "red";
            bars[second].style.height = bars[first].style.height;
            await new Promise((resolve) => setTimeout(resolve,1));
            bars[second].style.backgroundColor = color;
            bars[first].style.backgroundColor = color;
        }
        setStopsignal(false);
    }

    const handleBubbleSort = async() => {
        setStopsignal(false);
        let changes = BubbleSort([...array]);
        let bars = document.getElementsByClassName("array-value-bar");
        let color = bars[0].style.backgroundColor;

        for(const element of changes) {
            if (stopsignalRef.current) break;  
            setArray_swaps(a => a+1);
            let [first, second] = element;
            let temp_height = bars[first].style.height;
            bars[first].style.height = bars[second].style.height;
            bars[second].style.height = temp_height;
            bars[first].style.backgroundColor = "red";
            bars[second].style.backgroundColor = "red";
            await new Promise((resolve) => setTimeout(resolve, 1));
            bars[first].style.backgroundColor = color;
            bars[second].style.backgroundColor = color;
        }

        setStopsignal(false);
    };


    return (
        <>  
            <h1 style={{textAlign:"center",fontSize:"1.5em",color:"white",padding:"20px"}}>Array Swaps: {array_swaps}</h1>
            <div className="array-container-div">
                {array.map((value, index) => (
                    <div
                    key={index}
                    className="array-value-bar"
                    style={{
                            height: `${value}px`,
                            }}
                            ></div>
                            ))}
            </div>
            
            <h1 className="instruction" style={{fontSize:"1.5em", color:"orange"}}>
            Once You Stop Sorting, Click on "Generate Array" Before sorting again
            </h1>


            <div className="button-container">
                <button onClick={handleGenerateArray} style={{background:"green"}} className="navbar-button">
                    Generate Array
                </button>
                <button onClick={handleMergeSort} className="navbar-button">
                    Merge Sort
                </button>
                <button onClick={handleQuickSort} className="navbar-button">
                    Quick Sort
                </button>
                <button onClick={handleInsertionSort} className="navbar-button">
                    Insertion Sort
                </button>
                <button onClick={handleBubbleSort} className="navbar-button">
                    Bubble Sort
                </button>
                <button onClick={handleSelectionSort} className="navbar-button">
                    Selection Sort
                </button>
                <button onClick={handleStopsignal} style={{background:"green"}} className="navbar-button">
                    STOP SORTING
                </button>
            </div>
        </>
    );
}
