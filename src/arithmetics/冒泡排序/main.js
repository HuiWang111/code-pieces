let arr = [4,6,8,1,7,9,2,3,5];

for (let i = 0; i < arr.length - 1; ++i) {
	for (let j = 0; j < arr.length - 1 - i; ++j) {
		if (arr[j] > arr[j + 1]) {
			[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
		}
	}
}

console.log(arr)