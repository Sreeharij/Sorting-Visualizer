function merge(left,mid,right,left_arr,right_arr,stateless_array,changes){
    let left_size = mid - left + 1;
    let right_size = right - mid;
    for(let i=0;i<left_size;i++){
        left_arr[i] = stateless_array[left + i];
    }
    for(let i=0;i<right_size;i++){
        right_arr[i] = stateless_array[mid+i+1];
    }
    let i=0,j=0,k=left;
    while(i<left_size && j<right_size){
        if(left_arr[i] <= right_arr[j]){
            stateless_array[k] = left_arr[i];
            changes.push([k,`${stateless_array[k]}px`]);
            k++;
            i++;
        }
        else{
            stateless_array[k] = right_arr[j];
            changes.push([k,`${stateless_array[k]}px`]);
            k++;
            j++;
        }
    }
    while(i < left_size){
        stateless_array[k] = left_arr[i];
        changes.push([k,`${stateless_array[k]}px`]);
        k++;
        i++;
    }
    while(j < right_size){
        stateless_array[k] = right_arr[j];
        changes.push([k,`${stateless_array[k]}px`]);
        k++;
        j++;
    }
}

function mergesort_util(left,right,left_arr,right_arr,stateless_array,changes){
    if(left<right){
        let mid = Math.floor((left + right)/2);
        mergesort_util(left,mid,left_arr,right_arr,stateless_array,changes);
        mergesort_util(mid+1,right,left_arr,right_arr,stateless_array,changes);
        merge(left,mid,right,left_arr,right_arr,stateless_array,changes);
    }
}

export default function MergeSort(stateless_array){
    let changes = [];
    let n = stateless_array.length;
    let left_arr = new Array(n).fill(0);
    let right_arr = new Array(n).fill(0);
    mergesort_util(0,n-1,left_arr,right_arr,stateless_array,changes);
    console.log(`from inside merge sort ${changes.length}`);
    return changes;
}
