'use strict';

function Device(name, mark){    //название и марка девайса
    this._name = name;
	this._mark = mark;
	this._state = false;
}
Device.prototype.turnOn = function(){
	this._state = true;
};
Device.prototype.turnOff = function(){
	this._state = false;
};
Device.prototype.toString = function(){
	var state = this._state? 'turn on':'turn off';
	return "Device " + this._name + ',mark ' + this._mark + ' ' + state;
};

function Channel(ch,maxCH) {       // переключение каналов
	this._ch=ch;
	this._maxCH= maxCH;
}
Channel.prototype.getCH=function () {
	return this._ch;
};
Channel.prototype.setCH=function (ch) {     //текущий канал
	return this._ch=ch;
};
Channel.prototype.nextCH=function () {    //следующий канал
	if(this._ch < this._maxCH){
	this._ch++;}
	else {this._ch = 0}                  //если переключение проходит на канал больше максимального,
									     // то автоматически канал становится на позицию "0"
};
Channel.prototype.prevCH=function () {     //предыдущий канал
	if(this._ch > 0){
		this._ch--;}
	else {this._ch = this._maxCH}           //если переключение проходит на канал меньше "0",
						                   //то автоматически канал переходит на максимальное значение
};                                              //тем самым мы делаем переключение каналов по кругу

function Range(range,minRange,maxRange,step) { //диапазон значений(начальное значение,минимальное,максимальное,шаг значений)
	this._range=range;                          //значение по умолчанию диапазона
	this._maxRange=maxRange;                     //максимальное значение диапазона
	this._minRange=minRange;                     //минимальное значение диапазона
	this._step=step;                             //шаг значенний диапазона
}
Range.prototype.getRange=function () {
	return this._range
};
Range.prototype.setRange=function (range) {
	return this._range=range;
};
Range.prototype.next=function () {          //увеличиваем диапазон
	if(this._range < this._maxRange){
		this._range += this._step;}
};
Range.prototype.prev=function () {          //уменьшаем диапазон
	if(this._range > this._minRange){
		this._range -= this._step;}
};





function Tv(name,mark,channel,bright,volume){      //создаем класс телевизор
	Device.call(this,name,mark);
	this._tvCh= channel;                           //канал
	this._bright=bright;                            //яркость
	this._volume=volume;                            //громкость
	}
Tv.prototype = Object.create(Device.prototype);
Tv.prototype.constructor = Tv;
Tv.prototype.getChannel=function(){
	return this._tvCh.getCH();
};
Tv.prototype.nextChannel=function(){
	return this._tvCh.nextCH();
};
Tv.prototype.prevChannel=function(){
	return this._tvCh.prevCH();
};
Tv.prototype.bright=function () {
	return this._bright.getRange();
};
Tv.prototype.nextBright=function () {
	return this._bright.next();
};
Tv.prototype.prevBright=function () {
	return this._bright.prev();
};
Tv.prototype.volume=function () {
	return this._volume.getRange();
};
Tv.prototype.nextVolume=function () {
	return this._volume.next();
};
Tv.prototype.prevVolume=function () {
	return this._volume.prev();
};

function WasherMachine(name,mark,tempWater,time,pressing) {             //создаем класс стиральная машина
	Device.call(this,name,mark);
	this._tempWater=tempWater;                                      //температура воды
	this._time=time;                                                //время стирки
	this._pressing=pressing;                                        //отжим true или false
}
WasherMachine.prototype = Object.create(Device.prototype);
WasherMachine.prototype.constructor = WasherMachine;
WasherMachine.prototype.tempWater=function () {
	return this._tempWater.getRange();
};
WasherMachine.prototype.nextTemp=function () {
	return this._tempWater.next();
};
WasherMachine.prototype.prevTemp=function () {
	return this._tempWater.prev();
};


WasherMachine.prototype.start=function () {             //пуск машины  и условие нужен ли отжим?
	var machine=document.getElementById('WasherMachine');
	if(this._pressing == true){
		machine.innerHTML = "<strong>WasherMachine start...</strong>";
			setTimeout(function () {
				machine.innerHTML = "<strong> WasherMachine stop!!!</strong>";
			},this._time+5000);
	}
	else {
		machine.innerHTML = "<strong>WasherMachine start...</strong>";
		setTimeout(function () {
			machine.innerHTML = "<strong> WasherMachine stop!!!</strong>";
		},this._time);
	}
};

function ShowerCabine(name, mark, tempWater, light,mode) {      //класс душевая кабина
	Device.call(this,name,mark);
	this._tempWater=tempWater;                                  //температура воды
	this._light=light;                                          //яркость света в кабине
	this._mode=mode;                                            //включеный режим в кабине
}
ShowerCabine.prototype = Object.create(Device.prototype);
ShowerCabine.prototype.constructor = ShowerCabine;
ShowerCabine.prototype.tempWater=function () {
	return this._tempWater.getRange();
};
ShowerCabine.prototype.nextTemp=function () {
	return this._tempWater.next();
};
ShowerCabine.prototype.prevTemp=function () {
	return this._tempWater.prev();
};
ShowerCabine.prototype.light=function () {
	return this._light.getRange();
};
ShowerCabine.prototype.nextLight=function () {
	return this._light.next();
};
ShowerCabine.prototype.prevLight=function () {
	return this._light.prev();
};
ShowerCabine.prototype.mode=function () {           //варианты режимов кабины
	var cabine=document.getElementById('cabine');
	switch (this._mode){

		case 'shower':cabine.innerHTML ='mode = '+this._mode;break;
		case 'jacuzzi':cabine.innerHTML ='mode = '+this._mode;break;
		case 'massage':cabine.innerHTML ='mode = '+this._mode;break;
		default:
			cabine.innerHTML ( 'In the shower there are only such modes:shower,jacuzzi,massage' );
	}
};
var tv1 = new Tv('tv','lg',new Channel(74,75),new Range(100,0,100,1),new Range(15,0,30,2));
console.dir(tv1);
tv1.nextChannel();
tv1.nextChannel();
tv1.nextChannel();
tv1.prevChannel();
tv1.nextVolume();
tv1.nextVolume();
tv1.nextVolume();
tv1.nextBright();
tv1.prevBright();
tv1.prevBright();
tv1.prevBright();
tv1.nextBright();

var washer= new WasherMachine('machine','bosh',new Range(20,20,90,10),5000,true);
washer.nextTemp();
washer.nextTemp();
washer.nextTemp();
washer.prevTemp();
washer.start();
washer.turnOn();
console.log(washer.toString());
console.dir(washer);

var cabine = new ShowerCabine('ggg','gge',new Range(20,20,90,10),new Range(50,0,100,10),'jacuzzi');
cabine.mode();
cabine.nextTemp();
cabine.nextLight();
console.dir(cabine);
