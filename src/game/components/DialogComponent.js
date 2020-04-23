import React, {Component} from "react"

class Dialog extends Component {
    constructor(){
        super()
    }

    render(){
        // console.log("99",typeof(this.props.clickData), this.props.clickData)
        const che = []
        for (let key in this.props.clickData) {
            che.push( 
                <tr>
                    <td>{key}</td><td>{this.props.clickData[key]}</td>
                </tr>
            )
        }
        return this.props.visible?(
            <div className="dialog-mask">
                <div className="dialog">
                    <div className="gridtable">
                        <table>
                            <tr>
                                <th>对象</th><th>点击次数</th>
                            </tr>
                            {che}
                        </table>
                    </div>
                    <span className="close" onClick={this.props.onConfirm.bind(this)}>CLOSE</span>
                </div>
            </div>
        ): null
    }
}

export default Dialog