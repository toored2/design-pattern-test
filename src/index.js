
/*--------------------------------------使用jQuery 做一个模拟购物车的示例------------------------*/
import App from './demo/App.js'

let app = new App('app')
app.init()





/*--------------------------------------中介者模式------------------------*/
//中介者模式
/*
class A {
    constructor() {
        this.number = 0
    }
    setNumber(num, m) {
        this.number = num
        if (m) {
            m.setB()
        }
    }
}
class B {
    constructor() {
        this.number = 0
    }
    setNumber(num, m) {
        this.number = num
        if (m) {
            m.setA()
        }
    }
}
//中介者
class  Mediator {
    constructor(a, b) {
        this.a = a
        this.b = b
    }
    setB() {
        let number = this.a.number
        this.b.setNumber(number*100)
    }

    setA() {
        let number = this.b.number
        this.a.setNumber(number/100)
    }
}
//测试
let a =new A()
let b =new B()
let m = new Mediator(a, b)
a.setNumber(100, m)
console.log(a.number, b.number) //100 10000
b.setNumber(100, m)
console.log(a.number, b.number) //1 100
*/


/*--------------------------------------备忘录模式------------------------*/
//备忘录模式
//状态备忘
/*
class Memento {
    constructor(context) { //context 需要备忘的内容
        this.context = context
    }
    getContent() {
        return this.context
    }
}
//备忘列表
class CareTaker {
    constructor() {
        this.list = []
    }
    add(memento) {
        this.list.push(memento)
    }
    get(index) {
        return this.list[index]
    }
    getList() {
        console.log(this.list)
    }
}
//编辑器
class Editor {
    constructor() {
        this.content = null
    }
    setContent(context) {
        this.content = context
    }
    getContent() {
        return this.content
    }
    saveContentToMemento() {
        return new Memento(this.content)
    }
    getContentFromMemento(memento) {
        this.content =  memento.getContent()
    }
}
//测试
let editor = new Editor()
let careTaker = new CareTaker()
editor.setContent('111')
editor.setContent('222')
careTaker.add(editor.saveContentToMemento()) //将当前内容备份
editor.setContent('333')
careTaker.add(editor.saveContentToMemento()) //将当前内容备份
editor.setContent('444')

careTaker.getList()

console.log(editor.getContent())               //444
editor.getContentFromMemento(careTaker.get(1)) //撤销
console.log(editor.getContent())               //333
editor.getContentFromMemento(careTaker.get(0)) //撤销
console.log(editor.getContent())               //222
*/




/*--------------------------------------命令模式------------------------*/
//命令模式
//接收者
/*
class Receiver {
    exec() {
        console.log('执行')
    }
}

//命令者
class Command {
    constructor(receiver) {
        this.receiver = receiver
    }
    cmd() {
        console.log('执行命令')
        this.receiver.exec()
    }
}
//触发者
class Invoker {
    constructor(command) {
        this.command = command
    }
    invoke() {
        console.log('开始')
        this.command.cmd()
    }
}
//测试
//士兵
let soldier = new Receiver()
//小号手
let  trumpeter= new Command(soldier)
//将军
let general = new Invoker(trumpeter)
general.invoke()
*/





/*--------------------------------------职责链模式------------------------*/
//职责链模式
//请假审批，需要组长审批、经理审批、最后总监审批
/*
class Action {
    constructor( name ) {
        this.name = name
        this.nextAction = null
    }
    setNextAction(action) {
        this.nextAction =  action
    }
    handle() {
        console.log(`${this.name} 审批`)
        if(this.nextAction != null) {
            this.nextAction.handle()
        }
    }
}
// 测试
let a1 = new Action('组长')
let a2 = new Action('经理')
let a3 = new Action('总监')
a1.setNextAction(a2)
a2.setNextAction(a3)
a1.handle()
*/





/*--------------------------------------原型模式------------------------*/
//原型模式
// 'Object.create' 用到了原型模式的思想（虽然不是 java 的 clone）
//一个原型对象
/*
let prototype = {
    getName: function () {
        return this.first + '' + this.last
    },
    say: function () {
        console.log('hello')
    }
}
//基于原型创建 x
let x = Object.create(prototype)
x.first = 'A'
x.last = 'B'
console.log(x.getName())
x.say()

//基于原型创建 y
let y = Object.create(prototype)
y.first = 'C'
y.last = 'D'
console.log(y.getName())
y.say()
*/



/*--------------------------------------状态模式------------------------*/
//状态模式
/*
//状态 （红灯、绿灯、黄灯）
class State {
    constructor(color) {
        this.color = color
    }
    handle(context) {
        console.log(`turn to ${this.color} light`)
        //设置状态
        context.setState(this)
    }
}
//主体
class Context {
    constructor() {
    }
    getState(){
        return this.state
    }
    setState(state){
        this.state = state
    }
}

//测试
let context = new Context()
let green = new State('green')
let yellow = new State('yellow')
let red = new State('red')

//绿灯亮了
green.handle(context)
console.log(context.getState()) //打印状态
//黄灯亮了
yellow.handle(context)
console.log(context.getState()) //打印状态
//红灯亮了
red.handle(context)
console.log(context.getState()) //打印状态
 */

//状态模式-使用场景-有限状态机
/*
import StateMachine  from 'javascript-state-machine'
import $ from 'jquery'
//初始化状态机模型
let fsm = new StateMachine({
    init: '收藏',
    transitions: [
        {
            name: 'doStore',
            from: '收藏',
            to: '取消收藏'
        },
        {
            name: 'deleteStore',
            from: '取消收藏',
            to: '收藏'
        }
    ],
    methods: {
        //监听执行收藏
        onDoStore: function () {
            alert('收藏成功') //可以发 post 请求
            updateText()
        },
        //监听取消收藏
        onDeleteStore: function () {
            alert('已经取消收藏') //可以发 post 请求
            updateText()
        }
    }

})

let $btn = $('#btn1')
updateText()
//按钮点击事件
$btn.click(function () {
    if (fsm.is('收藏')) {
        fsm.doStore()
    } else {
        fsm.deleteStore()
    }

})
function updateText(){
    $btn.text(fsm.state)
}
*/
/*
//状态模式-使用场景-写一个简单的Promise
import StateMachine  from 'javascript-state-machine'
let fsm = new StateMachine({
    init: 'pending', //初始化状态
    transitions: [
        {
            name: 'resolve',
            from: 'pending',
            to: 'fullfilled'
        },
        {
            name: 'reject',
            from: 'pending',
            to: 'rejected'
        }
    ],
    methods: {
        //监听resolve
        onResolve: function (state, data) { //【2】
            //state - 当前状态机实例； data - fsm.resolve(xxx) 传递的参数
            console.log('state: ',state)
            console.log('data: ',data)
            data.successList.forEach(fn => fn())

        },
        //监听 reject
        onReject: function (state, data) {
            //state - 当前状态实例； data - fsm.reject(xxx) 传递的参数
        }
    }
})
//定义 Promise
class MyPromise {
    constructor(fn) {
        this.successList = []
        this.failList = []
        let that = this
        fn(function () { //【1】
            console.log('that: ',that)
            //resolve 函数
            fsm.resolve(that) // 会执行 【2】
        }, function () {
            //reject 函数
            fsm.reject(that)
        })
    }
    then(successFn, failFn) {
        this.successList.push(successFn)
        this.failList.push(failFn)
    }
}

//测试代码
function loadImg(src) {
    const promise = new MyPromise(function (resolve, reject) {
        let img = document.createElement('img')
        img.onload = function () {
            console.log('图片加载成功')
            resolve(img) // 会去执行【1】
        }
        img.onerror = function () {
            reject()
        }
        img.src = src
    })
    return promise
}

let src = 'https://www.imooc.com/static/img/index/logo.png'
let result = loadImg(src)
result.then(function () {
    console.log('ok1')
},function () {
    console.log('fail1')
})
result.then(function () {
    console.log('ok2')
},function () {
    console.log('fail2')
})
*/



//-------------------------------------迭代器模式------------------------*/
//迭代器模式
/*
    class Iterator {
    constructor(container) {
        this.list = container.list
        this.index = 0
    }
    next() {
        if(this.hasNext()) {
            return this.list[this.index++]
        }
        return  null
    }
    hasNext() {
        if(this.index >= this.list.length) {
            return false
        }
        return  true
    }
}

class Container {
    constructor(list) {
        this.list = list
    }
    //生成遍历器
    getIterator() {
        return new Iterator(this)
    }
}

//测试
let container = new Container([1, 2, 3, 4, 5])
let iterator = container.getIterator()
while(iterator.hasNext()) {
    console.log(iterator.next())
}
 */


/*-------------------------------------观察者模式-------------------------*/

//观察者模式
/*
//主题，保存状态，状态变化之后触发所有观察者对象
class Subject {
    constructor() {
        this.state = 0
        this.observers = []
    }
    getState() {
        return this.state
    }
    setState(state) {
        this.state = state
        this.notifyAllObervers()
    }
    notifyAllObervers() {
        this.observers.forEach(observer => {
            observer.update()
        })
    }
    attach(observer) {
        this.observers.push(observer) //更新 subject 的 observers
    }
}

//观察者
class Observer {
    constructor(name, subject) { //subject 是主题的实例
        this.name = name
        this.subject = subject
        this.subject.attach(this) //在初始化观察者的最后，把它添加进 subject
    }
    update() {
        console.log(`${this.name} update, state: ${this.subject.getState()}`)
    }
}

//测试
let s = new Subject()
let o1 = new Observer('o1', s)
let o2 = new Observer('o2', s)
let o3 = new Observer('o3', s)

s.setState(1)
s.setState(2)
s.setState(3)
 */


/*-----------------------------------  --工厂模式--------------------------*/
//工厂模式
/*
class Product {
    constructor(name) {
        this.name = name
    }
    init() {
        console.log('init')
    }
    fun1() {
        console.log('fun1')
    }
    fun2() {
        alert('fun2')
    }

}
class  Creator {
    create(name) {
        return new Product(name)
    }

}

//测试
let creator = new  Creator();
let p = creator.create('p1')
p.init() // 'fun1'
p.fun1() // 'fun2'
 */

/*--------------------------------------单例模式----------------------------*/

//单例模式
/*
class SingleObject {
    login(){
        console.log('login...')
    }
}

SingleObject.getInstance = (function () {
    let instance
    return function () {
        if(!instance){
            instance = new SingleObject()
        }
        return instance
    }

})()

//测试，注意这里只能使用静态函数 getInstance
//不能使用 new SingleObject()
let obj1 = SingleObject.getInstance()
obj1.login()
let obj2 = SingleObject.getInstance()
obj2.login()

console.log("obj1 === obj2:",obj1 === obj2)  //两者必须完全相等

console.log('-------分割线---------')

let obj3 = new SingleObject()  //无法完全控制
obj3.login()
console.log("obj1===obj3:",obj1===obj3)
 */

//单例模式-使用场景-登陆框
/*
class LoginForm {
    constructor() {
        this.state = 'hide'
    }
    show(){
        if(this.state === 'show'){
            alert('已经显示')
            return
        }
        this.state = 'show'
        console.log('登录框显示成功')
    }
    hide(){
        if(this.state === 'hide'){
            alert('已经隐藏')
            return
        }
        this.state = 'hide'
        console.log('登录框隐藏成功')
    }
}

LoginForm.getInstance = (function () {
    let instance
    return function () {
        if(!instance){
            instance = new LoginForm()
        }
        return instance
    }

})()

//测试
let login1 = LoginForm.getInstance()
login1.show()

let login2 = LoginForm.getInstance()
login2.hide()
console.log('login1===login2:',login1===login2) //true
*/

/*--------------------------------- ----适配器模式--------------------------*/
//适配器模式
/*
class Adaptee {
    specificRequest() {
        return '德国标准插头'
    }
}

class Target {
    constructor() {
        this.adaptee = new Adaptee()
    }
    request(){
        let info = this.adaptee.specificRequest()
        return `${info}-转换器-中国标准插头`
    }
}

//测试
let target = new  Target()
let res = target.request()
console.log(res) // '德国标准插头-转换器-中国标准插头'
 */

/*---------------------------------  ---装饰器模式--------------------------*/

//装饰器模式
/*
class Circle {
    draw(){
        console.log('画一个圆形')
    }
}
class Decorator {
    constructor(circle) {
        this.circle = circle
    }
    draw(){
        this.circle.draw()
        this.setRedBorder(circle)
    }
    setRedBorder(circle){
        console.log('设置红色边框')
    }
}

//测试
let circle = new Circle()
circle.draw()
console.log('-----分割线----------')
let dec = new Decorator(circle)
dec.draw()
*/

//装饰器模式--装饰类-demo
/*
@testDec
class Demo {

}

function testDec(target) {
    target.isDec = true
}
alert(Demo.isDec) //true
 */

//装饰器-使用场景-@mixins
/*
function mixins(...list) {
    return function (target) {
        console.log('target:', target)
        console.log('target.prototype---before:', target.prototype)
        console.log('list:',...list)

        Object.assign(target.prototype, ...list)

        console.log('target.prototype---after--:', target.prototype)
    }
}

const Foo = {
    foo(){
        console.log('foo')
    }
}
const Bar ={
    bar(){
        console.log('bar')
    }
}

@mixins(Foo, Bar)
class MyClass {

}

let obj = new MyClass()
obj.foo() // 'foo'
obj.bar() // 'bar'
*/


//装饰器-装饰方法-@readonly
/*
function readonly(target, name, descriptor) {
    console.log('target:',target)
    console.log('name:',name)
    console.log('descriptor---before--:',descriptor)

    descriptor.writable = false
    console.log('descriptor---after---:',descriptor)

    return descriptor
}

class Person {
    constructor() {
        this.first = 'A'
        this.last= 'B'
    }

    //装饰方法
    @readonly
    name() {
        return `${this.first} ${this.last}`
    }
}

let p = new Person()
console.log(p.name()) // 'A B'
p.name = function () {
    alert(200)
}
console.log(p.name) // 上面对p.name 的重写不会生效，还是老方法
*/

//装饰器-装饰方法-@log
/*
function  log(target, name, descriptor) {
    console.log('target:', target)
    console.log('name:', name)
    console.log('descriptor:', descriptor)
    console.log('descriptor.value:',  descriptor.value)

    let oldValue = descriptor.value
    descriptor.value = function () {
        console.log(`calling ${name} with \n` , arguments)
        return oldValue.apply(this, arguments)
    }
    return descriptor
}

class Math {
    @log
    add(a, b){
        return a + b
    }
}

let math = new Math()
let result = math.add(2, 4) //执行 add 时，会自动打印日志，因为有 @log 装饰器
console.log('result', result)
 */

//装饰器   core-decorators
/*
import {readonly} from "core-decorators";
class Person {
    @readonly()
    name() {
        return '张三'
    }
}
let p = new Person()
console.log(p.name())
p.name = function () { } //执行报错，因为 name() 是只读的
*/
/*
import {deprecate} from "core-decorators";

class Person {
    @deprecate('即将费用', {url: 'www.imooc.com'})
    name(){
        return '李四'
    }
}

let p = new Person()
console.log(p.name())
*/


/*----------------代理模式----------------*/

//代理模式
/*
class ReadImg {
    constructor(filename) {
        this.filename = filename
        this.loadFromDisk() //初始化即从硬盘中加载，模拟
    }
    display() {
        console.log('loading1...' + this.filename)
    }
    loadFromDisk() {
        console.log('loading2...' + this.filename)
    }
}

class ProxyImg {
    constructor(fileName) {
        this.realImg = new ReadImg(fileName)
    }
    display() {
        this.realImg.display()
    }
}

//test
let proxyImg = new ProxyImg('1.png')
proxyImg.display()
 */

//代理模式-使用场景-ES6 Proxy
/*
//明星
let star = {
    name: '张xx',
    age: 25,
    phone: 'star: 13312345678',
    price: 100000
}

//经纪人
let agent = new Proxy(star, {
    get: function ( target, key ) {
        if (key === 'phone'){
            //返回经纪人自己的电话
            return 'agent: 18887654321'
        }
        if (key == 'price') {
            //明星不报价，经纪人报价
            return 120000
        }
        return target[key]
    },
    set: function (target, key, val) {
        if (key === 'customPrice') {
            if (val < 100000) {
                //最低10万
                throw new Error('价格太低')
            } else {
                target[key] = val
                return true
            }
        }
    }
})

//test
console.log(agent.name)
console.log(agent.age)
console.log(agent.phone)
console.log(agent.price)

agent.customPrice = 150000
console.log('agent.customPrice:', agent.customPrice)
*/

