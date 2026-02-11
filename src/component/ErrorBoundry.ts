
import React from "react"



class Errorboundry extends React.Component {
    constructor(props){
        super(props)
        this.state = {hasError:false}

    }


    getDerievedStateFromError (error){
      return {hasError :true}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log("Error boundry Error",error,errorInfo)
    }

    render (){
        if(this.state.hasError){
            return(<div>someting went wrong</div>)
        }

        return this.props.children
    }
}

export Errorboundry