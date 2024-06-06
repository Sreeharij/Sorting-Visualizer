export default function generate_array(bound){
    let array = [];
    let min_number = 10;
    let max_number = 600;
    let range = (max_number - min_number + 1);
    for(let i=0;i<bound;i++){
        const random_number = Math.floor(Math.random() * range) + min_number;
        array.push(random_number);
    }
    return array;
}