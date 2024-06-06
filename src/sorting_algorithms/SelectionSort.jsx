export default function SelectionSort(stateless_array){
    let changes = []
    let n = stateless_array.length;
    let current_min_idx;
    for(let i=0;i<n-1;i++){
        current_min_idx = i;
        for(let j=i+1;j<n;j++){
            current_min_idx = stateless_array[j] < stateless_array[current_min_idx] ? j : current_min_idx;
            changes.push([j]);
            
        }
        let temp = stateless_array[i];
        stateless_array[i] = stateless_array[current_min_idx];
        stateless_array[current_min_idx] = temp;
        changes.push([i,current_min_idx]);
    }
    console.log(`from inside selection sort ${changes.length}`);
    return changes;
}