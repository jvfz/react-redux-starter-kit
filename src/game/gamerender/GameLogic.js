
import * as PIXI from "pixi.js"
import {TweenMax, TweenLite} from "gsap"

import SortContainer from "./SortContainer"

export default class GameLogic {
    constructor(){

        PIXI.utils.skipHello();

        this.renderer = PIXI.autoDetectRenderer({
            width:1136,
            height:640,
            backgroundColor:0x383838,
        })

        // this.renderer.view.style.width = "1136px";
        // this.renderer.view.style.height = "640px";
        // this.renderer.view.style.marginL = "100px";
        // this.renderer.view.style.marginRight = "";

        this.stage = new PIXI.Container();

        this.gContainer = new SortContainer()
        this.stage.addChild(this.gContainer)

        // let btn_image = "images/btn_continue.png"
        let card = "images/card_sheet.json"
        let btn_animate = "images/podbtn.png"

        PIXI.loader.add([card, btn_animate]).load(()=>{
            var texture = PIXI.loader.resources[btn_animate].texture
            var btn_show = new PIXI.Sprite(texture);
            btn_show.buttonMode = true;
            btn_show.anchor.set(0.5, 0.5);
            btn_show.x = 1060;
            btn_show.y = 200;
            btn_show.interactive = true;
            btn_show.on("click", this.onBtnHander.bind(this))
            this.stage.addChild(btn_show)
            let lb_strt = new PIXI.Text("数据")
            lb_strt.anchor.set(0.5, 0.5)
            lb_strt.position.set(0, 0)
            btn_show.addChild(lb_strt)

            this.addCard(PIXI.loader.resources[card].textures)

            let btn_ani = new PIXI.Sprite(PIXI.loader.resources[btn_animate].texture)
            btn_ani.buttonMode = true;
            btn_ani.anchor.set(0.5, 0.5);
            btn_ani.x = 1060;
            btn_ani.y = 580;
            btn_ani.interactive = true;
            btn_ani.on("click", ()=>{
                this.cardAnimation()
            })
            this.stage.addChild(btn_ani)
            this.btn_ani = btn_ani

            lb_strt = new PIXI.Text("发牌")
            lb_strt.anchor.set(0.5, 0.5)
            lb_strt.position.set(0, 0)
            btn_ani.addChild(lb_strt)

            let btn_reset = new PIXI.Sprite(PIXI.loader.resources[btn_animate].texture)
            btn_reset.buttonMode = true;
            btn_reset.anchor.set(0.5, 0.5);
            btn_reset.x = 1060;
            btn_reset.y = 450;
            // btn_reset.interactive = true;
            btn_reset.on("click", ()=>{
                this.resetCard()
            })
            this.stage.addChild(btn_reset)
            this.btn_reset = btn_reset

            lb_strt = new PIXI.Text("重置")
            lb_strt.anchor.set(0.5, 0.5)
            lb_strt.position.set(0, 0)
            btn_reset.addChild(lb_strt)

        }).on("error", (args)=>{
            console.log("add img error")
        })

        this.drawPolygon();

        this.start = this.start.bind(this);
        this.animate = this.animate.bind(this);
    }

    addCard(textures){
        this.cards = []
        Object.values(textures).forEach((texture)=>{
            let card = new PIXI.Sprite(texture);
            card.scale.set(0.5, 0.5)
            card.anchor.set(0.5, 0.6)
            card.position.set(1136/2, 120)
            console.log("sss", texture)
            if(texture.textureCacheIds[0] !== "bg_back.png")
            {
                this.gContainer.addChildZ(card)
                this.cards.push(card)
            }else
            {
                this.gContainer.addChildZ(card, 99)
            }

        })
        // this.cards.reverse()
        this.gContainer.sortChildren()
    }


    getView(){
        return this.renderer.view
    }

    drawPolygon(){
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xff0000);
        graphics.drawRoundedRect(100, 100, 90, 60, 4);
        graphics.endFill();
        graphics.zOrder = 1;
        graphics.interactive = true;
        graphics.on("click", this._onDisplayClick.bind(this))
        graphics.name = "RoundedRect"
        this.gContainer.addChildZ(graphics)

        graphics = new PIXI.Graphics();
        graphics.beginFill(0xff00f0)
        graphics.drawCircle(260, 100, 80)
        graphics.endFill()

        graphics.interactive = true;
        graphics.on("click", this._onDisplayClick.bind(this))
        graphics.name = "Circle"
        this.gContainer.addChildZ(graphics)

        graphics = new PIXI.Graphics();
        graphics.beginFill(0x999999)
        graphics.drawEllipse(100, 100, 40, 90)
        graphics.endFill()

        graphics.interactive = true;
        graphics.on("click", this._onDisplayClick.bind(this))
        graphics.name = "Ellipse"
        this.gContainer.addChildZ(graphics)
    }



    start(){
        this.animate()
    }

    registerClick(type, func){
        if(type === "graphic" && typeof(func) == "function")
            this.clickCallBack = func
        else if(type === "button" && typeof(func) == "function"){
            this.onBtnHander = func
        }
        else
            console.log("not a function")
    }

    _onDisplayClick(event){
        // console.log("106",event.currentTarget.name)
        if (this.clickCallBack) {
            this.clickCallBack(event.currentTarget.name);
        }
    }

    upView(name, zOrder){
        console.log("upView", name, zOrder)
        if(name == "" || typeof(name) != "string" || typeof(zOrder) != "number") return;
        
        let graphic = this.gContainer.getChildByName(name);
        graphic.zOrder = zOrder;
        this.gContainer.sortChildren()
        
    }

    cardAnimation(){
        // console.log("141", dt)
        
        let pos = [
            {x: 248, y: 320},
            {x: 500, y: 500},
            {x: 888, y: 320}
        ];
        let count = [0,0,0];
        this.cards.forEach((card, i) => {
            let index = Math.floor(i%3);
            let tx = pos[index].x;
            let ty = pos[index].y;
            
            if(index == 0 || index == 2){
                ty += 30 * count[index]
            }else{
                tx += 30 * count[index]
            }
            count[index] += 1;
            TweenMax.to(card, {duration:0.2, delay:i*0.2, x:tx, y:ty, ease: "power2.out"})
        })
        console.log("ddddd")
        this.btn_ani.interactive = false;
        TweenMax.to(this.btn_reset,{duration: this.cards.length*0.2, onComplete:(args)=>{
            this.btn_reset.interactive = true;
        }})
    }

    resetCard(){
        this.btn_reset.interactive = false;
        this.cards.forEach((card, i) => {
            TweenMax.to(card, {duration: 0.2, x: 1136/2, y:120, ease: "power2.out"})
        })
        TweenMax.to(this.btn_ani,{duration: 0.2, onComplete:(args)=>{
            this.btn_ani.interactive = true;
        }})
    }

    animate(){
        this.frame = requestAnimationFrame(this.animate)
        this.renderer.render(this.stage)
    }
}