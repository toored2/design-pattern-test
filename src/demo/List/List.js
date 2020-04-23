import $ from 'jquery'
import {GET_LIST} from "../config/config.js";
import createItem from "../Item/CreateItem.js";

export default class List {
    constructor(app) {
        this.app = app
        this.$el = $('<div>')
    }

    //获取数据
    loadData() {
        //返回 Promise 实例
        return fetch(GET_LIST).then(result => {
            return result.json() //返回一个Promise
        })
    }

    //生成列表
    initItemList(data) {
        /*data.map(itemData => {
            // 创建一个 Item 然后init
            let item = createItem(this, itemData)
            item.init()
            return item
        })*/

        data.forEach((itemData) => {
            //创建一个 Item 然后 init
            console.log(11111111111111)
            let item = createItem(this, itemData)
            item.init()
        })
    }

    //渲染
    render() {
        this.app.$el.append(this.$el)
    }

    init() {
        this.loadData().then(data => {
            this.initItemList(data)
        }).then(() => {
            // 最后再一起渲染DOM，以避免重复渲染的性能问题
            this.render()
        })
    }
    
}
