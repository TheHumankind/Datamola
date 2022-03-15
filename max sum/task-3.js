const arr = [-2,1,-3,4,-1,2,1,-5,4];

function getMaxSum(arr) {
    let maxSum = 0;
    for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        for (let j = i; j < arr.length; j++) {
            sum += arr[j];
            if (maxSum < sum) {
                maxSum += arr[j];
            }
        }
    }
    return maxSum;
}

console.log(getMaxSum(arr));