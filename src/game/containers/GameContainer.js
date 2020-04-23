import React, {Component} from "react"
import GameComponent from "../components/GameComponent"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {changeIndex} from "../reducers/game"
import DialogComponent from "../components/DialogComponent"

class GameContainer extends Component {

    static propTypes = {
        container: PropTypes.object
    }

    constructor(){
        super();
        this.state = {
            clickTimes:{},
            showDialog: false,
            totalClick: 0 
        }
    }

    componentWillMount(){
        this._loadStorageClickTimes()
    }

    _loadStorageClickTimes(){
        let data = localStorage.getItem("clickTimes");
        data = data? JSON.parse(data) :{};

        let totalClick = 0
        for(let key in data){
            totalClick += data[key]
        }
        console.log("35", totalClick)

        this.setState({
            clickTimes:data,
            totalClick:totalClick
        })
    }

    handleClick(name){
        let times = 0;
        if (this.state.clickTimes[name]) {
            times = this.state.clickTimes[name] + 1;
        }else
        {
            times += 1;
        }
        let newCt = {...this.state.clickTimes};
        newCt[name] = times;

        localStorage.setItem("clickTimes", JSON.stringify(newCt))

        console.log("46",{name:name, times: times})
        if (this.props.changeAndShowTimes){
            this.props.changeAndShowTimes({name:name, index: this.state.totalClick + 1})
        }

        this.setState({
            clickTimes: newCt,
            totalClick: this.state.totalClick + 1
        })
    }

    handleButton(){
        this.setState({showDialog: true})
    }

    handleConfirm(){
        this.setState({
            showDialog:false
        })
    }

    render(){
        console.log("gameContainer render", this.props)
        return(
            <div>
                <GameComponent 
                container={this.props.container}
                onClick={this.handleClick.bind(this)}
                onButton={this.handleButton.bind(this)}
                />
                <DialogComponent 
                    clickData={this.state.clickTimes}
                    visible={this.state.showDialog}
                    onConfirm={this.handleConfirm.bind(this)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        container:state.container
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        changeAndShowTimes:(container)=>{
        console.log("74", container)

            dispatch(changeIndex(container))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)