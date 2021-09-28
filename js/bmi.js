// 計算BMI
// 輸入 身高 體重
// 按鈕
// 輸出 BMI數值列表 (帶有顏色 BMI 身高 體重 日期)
// 取得所有需要的元件
var cm = document.querySelector('.height');
var kg = document.querySelector('.weight');
var button = document.querySelector('.button');
var list = document.querySelector('.container');
var clearButton = document.querySelector('.clearHistory');
var data = JSON.parse(localStorage.getItem('alldata')) || [];
var result = '';
var bmi = 0;


// 事件監聽
button.addEventListener('click',answer,false);
clearButton.addEventListener('click',clearHistory,false);
updataList(data);
button.addEventListener('click',clearinput,false);



function answer(){
	var h = cm.value;
	var w = kg.value;
	var checkH = new Number(h);
	var checkW = new Number(w);
	// 
	if(isNaN(checkH) || isNaN(checkW)){
		alert('請填入數字');
		return;
	}
	if(h == ''||w == ''||h <= 0||w <= 0){
		alert('請輸入身高與體重，數值不可為0');
		return;
	}
	

	calculate(h,w);
	updata(h,w);
	updataList(data);
	console.log(data); //方便觀察data資料的變化
}




// 更新localStorage的資料
// 輸入 h w
// 輸出 一個資料物件進傳送到localStorage
function updata(h,w){
	var ary = {
		height : h,
		weight : w,
		BMI : bmi,
		judge : result,
		time : today()
	};
	data.push(ary);
	// 放進已經從localStorage撈出來的資料
	localStorage.setItem('alldata',JSON.stringify(data));
	// 再將資料放進localStorage裡面
}



// 計算bmi
// 輸入 h w 的資料
// 輸出 bmi 以及判斷資訊
function calculate(h,w){
	var bmibefore = w/((h/100)*(h/100));
	bmi = bmibefore.toFixed(2);
	if(bmi < 18.5){
		result = '過輕';
	}else if (bmi>=18.5 && bmi<24) {
		result = '理想';
	}else if (bmi>=24 && bmi<27) {
		result = '過重';
	}else if (bmi>=27 && bmi<30) {
		result = '輕度肥胖';
	}else if (bmi>=30 && bmi<35) {
		result = '中度肥胖';
	}else if (bmi>=35) {
		result = '重度肥胖';
	}
	
}


// 從result判斷顏色
// 輸入result 
// 輸出顏色判斷，在頁面的list加上class屬性
function changeColor(i,result){
	var box = document.querySelectorAll('.colorBox');
	switch(result){
		case '過輕':
		    box[i].setAttribute('id', 'light');
            break;
        case '理想':
            box[i].setAttribute('id', 'normal');
            break;
        case '過重':
            box[i].setAttribute('id', 'overweight');
            break;
        case '輕度肥胖':
            box[i].setAttribute('id', 'mildlyFat');
            break;
        case '中度肥胖':
            box[i].setAttribute('id', 'mediumFat');
            break;
        case '重度肥胖':
            box[i].setAttribute('id', 'severeFat');
            break;
	}
}




// 更新頁面的bmi紀錄
// 輸入 localStorage 
// 輸出 頁面list

function updataList(item){
	var str = '';
	var len = item.length;
	for(var i=(len-1);i>=0;i--){
		str += `<div class="colorBox">
                        <p><span> ${data[i].judge}</span>BMI<span> ${data[i].BMI}</span>weight<span> ${data[i].weight}</span>height<span> ${data[i].height}</span> ${data[i].time}</p>
                    </div>`
	}
	list.innerHTML = str;

	var colorNum = len-1;
	for(var i=0;i<len;i++){
		changeColor(i,data[colorNum].judge);
		colorNum --;
	}
}


// 當下日期
function today(){
	var today = new Date();
	var time = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
	return time;
}


// 刪除紀錄
function clearHistory(){
	localStorage.removeItem('alldata');
	data = [];
	updataList(data);
}

// 刪除留在input上面的值
function clearinput(){
	kg.value = '';
	cm.value = '';
}
