export default function BubbleSort(stateless_array){
    let changes = []
    let n = stateless_array.length;
    let last_swapped = n - 1;
    let new_last_swapped = n - 1;
    let swapped = false;
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < last_swapped; j++) {
            if (stateless_array[j] > stateless_array[j + 1]) {
                let temp = stateless_array[j];
                stateless_array[j] = stateless_array[j + 1];
                stateless_array[j + 1] = temp;                
                new_last_swapped = j;
                swapped = true;
                changes.push([j,j+1]);
            }
        }
        if (!swapped) {
            break;
        }
        last_swapped = new_last_swapped;
    }
    console.log(`from inside bubble sort ${changes.length}`);
    return changes;
}
