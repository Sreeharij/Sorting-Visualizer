function swap(arr,first,second,changes){
    let temp = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;
    changes.push([first,second]);
}

function push_median_to_left(arr,left,right,changes){
    let middle = Math.floor((left + right)/2);
    if(arr[middle] < arr[left]){
        swap(arr,left,middle,changes);
    }
    if(arr[right] < arr[left]){
        swap(arr,left,right,changes);
    }
    if(arr[middle] < arr[right]){
        swap(arr,left,middle,changes);
    }
    else{
        swap(arr,left,right,changes);
    }
}

function util(arr,left,right,changes){
    if(left >= right)return;
    push_median_to_left(arr,left,right,changes);
    let pivot_idx = left;
    let left_ptr = left + 1;
    let right_ptr = right;

    while(left_ptr <= right_ptr){ //THE LESS THAN OR 'EQUAL TO' CONDITION IS A MUST, ELSE IT WILL RESULT IN ERROR
        while(left_ptr <= right && arr[left_ptr] <= arr[pivot_idx]){
            left_ptr++;
        }
        while(right_ptr >= pivot_idx && arr[right_ptr] > arr[pivot_idx]){
            right_ptr--;
        }
        if(left_ptr < right_ptr){
            swap(arr,left_ptr,right_ptr,changes);
        }
    }
    swap(arr,pivot_idx,right_ptr,changes);
    util(arr,left,right_ptr -1,changes);
    util(arr,right_ptr+1,right,changes);
}

export default function QuickSort(stateless_array){
    let changes = []
    util(stateless_array,0,stateless_array.length - 1,changes);
    console.log(`from inside quick sort ${changes.length}`);
    return changes;
}