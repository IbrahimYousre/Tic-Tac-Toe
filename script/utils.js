var Arrays = {};
Arrays.equals = function(arr1,arr2){
	if (arr1.length != arr2.length)
		return false;
	for (var i = 0, l = arr1.length; i < l; i++) {
		if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
			if (!equals(arr1[i],arr2[i]))
				return false;
		}
		else if (arr1[i] != arr2[i]) {
			return false;
		}
	}
	return true;
}
Arrays.shuffle = function(array){
	var i,j,l,tmp;
	for (i = 0, l = array.length; i < l; i++) {
		j = Math.floor(Math.random()*l);
		tmp = array[i];
		array[i] = array[j];
		array[j] = array[i];
	}
	return array;
}
Arrays.min = function(array){
	var m = array[0];
	for(var i=1,l=array.length;i<l;i++){
		m = m<array[i]?m:array[i];
	}
	return m;
}
Arrays.max = function(array){
	var m = array[0];
	for(var i=1,l=array.length;i<l;i++){
		m = m>array[i]?m:array[i];
	}
	return m;
}