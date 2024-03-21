function findDuplicates(arr) {
    const duplicates = [];
    for (let i = 0; i < arr.length; i++) {
        const num = Math.abs(arr[i]);
        if (arr[num - 1] < 0) {
            duplicates.push(num);
        } else {
            arr[num - 1] = -arr[num - 1];
        }
    }
    return duplicates;
}
//This function uses only one for loop, so has a time complexity of O(n). 
// It does not use any auxiliary data structures such as arrays or maps, so has a space complexity of O(1).
// This function works by using the input array to mark numbers that have already been visited by turning them negative
// When a negative number is encountered, it is added to the array of duplicate numbers.
// Test cases
console.log(findDuplicates([1, 2, 3, 4, 5]));
console.log(findDuplicates([1, 2, 3, 3, 4, 5]));
console.log(findDuplicates([1, 1, 2, 3, 3, 4, 5]));
console.log(findDuplicates([1, 1, 1, 2, 3, 3, 3, 4, 5, 5]));
