    let arr_1 = [7, 1, 5, 3, 6, 4];
    let arr_2 = [7, 6, 5, 4, 3, 2, 1];
    let arr_3 = [1, 2, 3, 4, 5];
    function maxProfit(arr) {
        let sum = 0;
        for (let i = 1; i < arr.length; i++) 
            if (arr[i] > arr[i - 1]) 
                sum += arr[i] - arr[i - 1];
        return sum;
    };

    console.log(maxProfit(arr_3));
