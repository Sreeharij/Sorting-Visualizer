export default function InsertionSort(stateless_array){
    let changes = []
    let n = stateless_array.length;
    let i,j;
    for(i = 1;i<n;i++){
        let current = stateless_array[i];        
        for(j = i-1;j>=0;j--){
            if(current < stateless_array[j]){
                stateless_array[j+1] = stateless_array[j];
                changes.push([j,j+1]);
            }
            else{
                break;
            }
        }
        stateless_array[j+1] = current;
        changes.push([-1,j+1,current]);
    }
    console.log(`from inside insertion sort ${changes.length}`);
    return changes;
}