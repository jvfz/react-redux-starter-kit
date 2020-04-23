import React, {Component} from "react"
import PropTypes from "prop-types"

import GameLogic from "../gamerender/GameLogic"

export default class GameComponent extends Component{

    static propTypes = {
        onClick: PropTypes.func,
        onButton: PropTypes.func,
        container: PropTypes.object,
    }

    constructor(){
        super();

        this.gameLogic = new GameLogic();
        this.gameLogic.registerClick("graphic", this.handlerClick.bind(this))
        this.gameLogic.registerClick("button", this.hanlerBtnClick.bind(this))
    }

    componentDidMount(){
        this.refs.gameRoot.appendChild(this.gameLogic.getView())
        this.gameLogic.start()
    }

    componentDidUpdate(){
        this.gameLogic.upView(this.props.container.name, this.props.container.index)
    }

    handlerClick(name){
        if(this.props.onClick){
            this.props.onClick(name)
        }
    }

    hanlerBtnClick(){
        console.log("component 33.")
        this.props.onButton()
    }

    render(){
        console.log("componet ccc: ", this.props.container)
        return(
            <div id="game-Root" ref="gameRoot" className="game_root">
                
            </div>
        )
    }
}