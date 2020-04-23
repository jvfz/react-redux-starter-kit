
// action key
// 1.改变层级

const CHANGE_ZINDEX = "c_zindex"

export default (state, action) =>{
    if(!state){
        state = {
            container: {
                name:'',
                index:0,
            }
        };
    }

    switch (action.type) {
        case CHANGE_ZINDEX:
            console.log("reducer 19", action)
            return {container:{...action.container}};
        default:
            return state;
    }
}

export const changeIndex = (container)=>{
    console.log("reducer 27", container)
    return {type:CHANGE_ZINDEX, container};
}